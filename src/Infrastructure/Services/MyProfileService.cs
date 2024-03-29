using System.Threading.Tasks;
using IdentityModel;
using Duende.IdentityServer.Services;
using Duende.IdentityServer.Models;
using Microsoft.Extensions.Logging;
using System.Linq;

// https://stackoverflow.com/a/64188170
public class MyProfileService : IProfileService
{
    private readonly ILogger<MyProfileService> _logger;
    public MyProfileService(ILogger<MyProfileService> logger) {
        _logger = logger;
    }

    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        //get role claims from ClaimsPrincipal 
        var roleClaims = context.Subject.FindAll(JwtClaimTypes.Role);
        var emailClaims = context.Subject.FindAll(JwtClaimTypes.Email);
        var nameClaim = context.Subject.FindAll(JwtClaimTypes.Name);

        // _logger.LogWarning("RoleClaims");
        // foreach (var claim in emailClaims) {
        //     _logger.LogWarning(claim.ToString());
        // }

        //add your role claims 
        context.IssuedClaims.AddRange(roleClaims);
        context.IssuedClaims.AddRange(emailClaims);
        context.IssuedClaims.AddRange(nameClaim);
        return Task.CompletedTask;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        // await base.IsActiveAsync(context);
        return Task.CompletedTask;
    }
}
