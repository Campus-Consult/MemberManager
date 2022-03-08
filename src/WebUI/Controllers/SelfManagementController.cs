using MemberManager.Application.Positions.Commands.AssignToPosition;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.Positions.Commands.DismissFromPosition;
using MemberManager.Application.Positions.Commands.ReactivatePosition;
using MemberManager.Application.Positions.Commands.UpdatePosition;
using MemberManager.Application.Positions.Queries.GetAssignSuggestions;
using MemberManager.Application.Positions.Queries.GetDismissSuggestions;
using MemberManager.Application.Positions.Queries.GetPositionDetails;
using MemberManager.Application.Positions.Queries.GetPositions;
using MemberManager.Application.Positions.Queries.GetPositionsHistory;
using MemberManager.Application.Positions.Queries.GetPositionsWithAssignees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using IdentityModel;
using MemberManager.Application.SelfManagement.Queries.GetBasic;
using System;

namespace MemberManager.WebUI.Controllers
{
    [Authorize]
    [Route("api/self")]
    public class SelfManagementController : ApiController
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SelfManagementController(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<BasicInfoVm>> GetOverview()
        {
            var MAIL_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
            var email = _httpContextAccessor.HttpContext.User.FindFirst(c => c.Type == MAIL_CLAIM).Value;
            return await Mediator.Send(new GetBasicQuery{ Email = email});
        } 
    }
}
