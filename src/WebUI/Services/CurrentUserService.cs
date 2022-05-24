using MemberManager.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace MemberManager.WebUI.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly string MAIL_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            _httpContextAccessor = httpContextAccessor;
        }

        public string UserId { get; }
        public string GetEmailAssociate() {
            return _httpContextAccessor.HttpContext?.User?.FindFirstValue(MAIL_CLAIM);
        }
    }
}
