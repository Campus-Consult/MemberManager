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
using MemberManager.Application.People.Queries.GetPersonDetail;
using MemberManager.Application.People.Commands.UpdatePerson;
using MemberManager.Application.People.Commands.CreatePerson;

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
        public async Task<ActionResult<PersonDetailVm>> GetOverview()
        {
            return await Mediator.Send(new GetBasicQuery{ Email = Util.GetAssociationEmailOrError(_httpContextAccessor)});
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> Update(UpdatePersonCommand command)
        {
            var userMail = Util.GetAssociationEmailOrError(_httpContextAccessor);
            if (command.EmailAssociaton != userMail) {
                return BadRequest("bad association email!");
            }
            var basicInfo = await Mediator.Send(new GetBasicQuery{ Email = userMail});

            if (command.Id != basicInfo.Id)
            {
                return BadRequest("id mismatch!");
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
