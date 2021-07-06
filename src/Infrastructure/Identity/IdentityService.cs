using MemberManager.Application.Common.Interfaces;
using MemberManager.Application.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemberManager.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return user.UserName;
        }
        public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = userName,
            };

            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user != null)
            {
                return await DeleteUserAsync(user);
            }

            return Result.Success();
        }

        public async Task<Result> DeleteUserAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<List<string>> GetUserMailsForRole(string roleName)
        {
            return (await _userManager.GetUsersInRoleAsync(roleName))
                .Select(u => u.Email).ToList();
        }

        public async Task<Result> AddUserToRole(string userEmail, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) {
                return Result.Failure(new List<string>() {"User with this E-Mail does not exist!"});
            }
            var result = await _userManager.AddToRoleAsync(user, roleName);
            return result.ToApplicationResult();
        }

        public async Task<Result> RemoveUserFromRole(string userEmail, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) {
                return Result.Failure(new List<string>() {"User with this E-Mail does not exist!"});
            }
            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            return result.ToApplicationResult();
        }
    }
}
