using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Common;
using MemberManager.Domain.Entities;
using MemberManager.Infrastructure.Identity;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using System.Data;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace MemberManager.Infrastructure.Persistence
{
    public class ApplicationAuthSeed {
        public static async Task CreateAdminRole(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, string defaultAdminUserEmail) {
            var adminRole = await roleManager.FindByNameAsync("Admin");
            if (adminRole == null) {
                await roleManager.CreateAsync(new IdentityRole() {
                    Name = "Admin",
                });
            }
            if (defaultAdminUserEmail == null) {
                return;
            }
            // get admin user (it it exists)
            var defaultAdminUser = await userManager.FindByEmailAsync(defaultAdminUserEmail);
            if (defaultAdminUser != null) {
                // check, if they are already admin. If not, give them the admin role
                if (!await userManager.IsInRoleAsync(defaultAdminUser, "Admin")) {
                    await userManager.AddToRoleAsync(defaultAdminUser, "Admin");
                }
            }
        }
    }
}
