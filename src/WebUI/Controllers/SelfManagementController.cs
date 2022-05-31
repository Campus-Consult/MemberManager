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
using MemberManager.Application.SelfManagement.Queries.GetSelf;
using System;
using MemberManager.Application.People.Queries.GetPersonDetail;
using MemberManager.Application.People.Commands.UpdatePerson;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.SelfManagement.Commands.UpdateSelf;
using MemberManager.Application.SelfManagement.Commands.CreateSelf;
using MemberManager.Application.Common.Interfaces;

namespace MemberManager.WebUI.Controllers
{
    [Authorize]
    [Route("api/self")]
    public class SelfManagementController : ApiController
    {
        private readonly ICurrentUserService _currentUserService;
        public SelfManagementController(ICurrentUserService currentUserService) {
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<PersonDetailVm>> GetOverview()
        {
            return await Mediator.Send(new GetSelfQuery{ Email = _currentUserService.GetEmailAssociate()});
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Create(CreatePersonCommand command)
        {
            var selfCommand = new CreateSelfCommand {
                CreateCommand = command,
                Email = _currentUserService.GetEmailAssociate(),
            };

            await Mediator.Send(selfCommand);

            return NoContent();
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> Update(UpdatePersonCommand command)
        {
            var selfCommand = new UpdateSelfCommand {
                UpdateCommand = command,
                Email = _currentUserService.GetEmailAssociate(),
            };

            await Mediator.Send(selfCommand);

            return NoContent();
        }
    }
}
