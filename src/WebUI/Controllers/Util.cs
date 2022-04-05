
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;

namespace MemberManager.WebUI.Controllers
{
    public class Util {
        public static string GetAssociationEmailOrError(IHttpContextAccessor _httpContextAccessor) {
            var MAIL_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
            var email = _httpContextAccessor.HttpContext.User?.FindFirst(c => c.Type == MAIL_CLAIM)?.Value;
            if (email == null) {
                throw new UnauthorizedAccessException();
            } else {
                return email;
            }
        }
    }
}
