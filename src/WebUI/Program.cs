using MemberManager.Infrastructure.Identity;
using MemberManager.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace MemberManager.WebUI
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var context = services.GetRequiredService<ApplicationDbContext>();

                    if (context.Database.IsMySql() || context.Database.IsSqlServer())
                    {
                        context.Database.Migrate();
                    }

                    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

                    await ApplicationDbContextSeed.SeedDefaultUserAsync(userManager);
                    await ApplicationDbContextSeed.SeedSampleTodoListDataAsync(context);
                    await ApplicationDbContextSeed.SeedDefaultMemberDataAsync(context);

                    var config = services.GetRequiredService<IConfiguration>();

                    await ApplicationAuthSeed.CreateAdminRole(roleManager, userManager, config.GetValue<String>("DefaultAdminUser"));

                    #if DEBUG
                    // make sure to never seed random data in release build
                    var randomConfig = services.GetRequiredService<IConfiguration>().GetSection("ApplicationDbContextSeedConfig").Get<ApplicationDbContextSeedConfig>();
                    await ApplicationDbContextSeed.SeedRandomMemberDataAsync(context, randomConfig);
                    #endif
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

                    logger.LogError(ex, "An error occurred while migrating or seeding the database.");

                    throw;
                }
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
