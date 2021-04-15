using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Infrastructure.Files;
using MemberManager.Infrastructure.Helpers;
using MemberManager.Infrastructure.HubSpot;
using MemberManager.Infrastructure.Identity;
using MemberManager.Infrastructure.Persistence;
using MemberManager.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace MemberManager.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("MemberManagerDb"));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseMySql(
                        configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            }

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

                services.AddDefaultIdentity<ApplicationUser>()
                    .AddEntityFrameworkStores<ApplicationDbContext>();
            
            services.AddAuthentication()
                .AddCookie(options => {
                    options.SessionStore = new MemoryCacheTicketStore();
                })
                .AddOpenIdConnect(options => {
                    options.SignInScheme = IdentityConstants.ExternalScheme;
                    var azureConf = configuration.GetSection("AzureAd");
                    options.CallbackPath = azureConf["CallbackPath"];
                    options.ClientId = azureConf["ClientId"];
                    options.ClientSecret = azureConf["ClientSecret"];
                    options.Authority = $"https://login.microsoftonline.com/{azureConf["TenantId"]}/v2.0";
                    options.ResponseType = OpenIdConnectResponseType.Code;
                    foreach (var scope in azureConf["Scopes"].Split(' ', StringSplitOptions.RemoveEmptyEntries)) {
                        options.Scope.Add(scope);
                    }
                    // options.GetClaimsFromUserInfoEndpoint = true;
                    // options.SaveTokens = true;
                    options.DisableTelemetry = true;
                    // options.Events.OnTokenResponseReceived = ctx => {
                    //     // could get and store the access token here
                    //     ctx.TokenEndpointResponse.AccessToken
                    // };
                    // options.Events.OnTicketReceived = async ctx => {
                    //     Console.WriteLine("\n\n\n\n\nHERE should be tokens");
                    //     foreach(var token in ctx.Properties.GetTokens()) {
                    //         Console.WriteLine(token.Name);
                    //         Console.WriteLine(token.Value);
                    //     }
                    //     ctx.Properties.StoreTokens(ctx.Properties.GetTokens().Where(t => t.Name != "id_token"));
                        // ctx.Properties.StoreTokens(new List<AuthenticationToken>{});
                        // var graphClient = GraphSdkHelper.GetAuthenticatedClient(ctx.Properties.GetTokenValue("access_token"));
                        // var groups = await graphClient.Me.MemberOf.Request().GetAsync();
                        // var groupClaimMapping = configuration.GetSection("SharepointGroupClaimMapping");
                        // var permissions = groups
                        //     // get the Claim (if any) configued for this group
                        //     .Select(group => groupClaimMapping.GetValue<string>(group.Id))
                        //     .Where(claim => claim != null)
                        //     // more than one group can map to a claim
                        //     .Distinct();
                        //     // the value of the claim doesn't matter, only the type is checked
                        // var claims = permissions.Select(claim => new Claim(claim, "_")).ToList();
                        // claims.Add(new Claim("Permissions", String.Join(",",permissions))); // temp solution
                        // if (claims.Count != 0) {
                        //     var appIdentity = new ClaimsIdentity(claims);

                        //     ctx.Principal.AddIdentity(appIdentity);
                        // }
                    // };
                });
            
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();
            services.AddTransient<ICRMService, HubSpotService>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            return services;
        }
    }
}
