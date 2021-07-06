using MemberManager.Application.Common.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MemberManager.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);

        Task<List<string>> GetUserMailsForRole(string roleName);

        Task<Result> AddUserToRole(string userEmail, string roleName);

        Task<Result> RemoveUserFromRole(string userEmail, string roleName);
    }
}
