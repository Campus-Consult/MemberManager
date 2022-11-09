using MemberManager.Application.Positions.Commands.AssignToPosition;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.Positions.Commands.DismissFromPosition;
using MemberManager.Application.Positions.Commands.ReactivatePosition;
using MemberManager.Application.Positions.Commands.UpdatePosition;
using MemberManager.Application.Positions.Commands.UpdatePersonPosition;
using MemberManager.Application.Positions.Queries.GetAssignSuggestions;
using MemberManager.Application.Positions.Queries.GetDismissSuggestions;
using MemberManager.Application.Positions.Queries.GetPositionDetails;
using MemberManager.Application.Positions.Queries.GetPositions;
using MemberManager.Application.Positions.Queries.GetPositionsHistory;
using MemberManager.Application.Positions.Queries.GetPositionsWithAssignees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
    [Authorize(Policy = "Admin")]
    public class PositionController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<PositionsVm>> Get()
        {
            return await Mediator.Send(new GetPositionsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PositionDto>> Get(int id, bool history=true)
        {
           return await Mediator.Send(new GetPositionDetailsQuery { Id = id, IncludeHistory = history });
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<PositionsWAVm>> GetWithAssignees(bool history) 
        {
            return await Mediator.Send(new GetPositionsWithAssigneesQuery{
                IncludeHistory = history,
            });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PositionsHistoryVm>> GetHistory(int id)
        {
            return await Mediator.Send(new GetPositionsHistoryQuery { Id = id });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PeopleAssignSuggestions>> GetAssignSuggestions(int id) 
        {
            return await Mediator.Send(new GetAssignSuggestionsQuery{PositionId = id});
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PeopleDismissSuggestions>> GetDismissSuggestions(int id) 
        {
            return await Mediator.Send(new GetDismissSuggestionsQuery{PositionId = id});
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePositionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdatePositionCommand command)
        {
            if (id != command.Id)
            {
               return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Deactivate(int id, DeactivatePositionCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Reactivate(int id, ReactivatePositionCommand command)
        {
            if (id != command.Id) {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Assign(int id, AssignToPositionCommand command)
        {
            if (id != command.PositionId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Dismiss(int id, DismissFromPositionCommand command) {
            if (id != command.PositionId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);
            
            return NoContent();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UpdatePersonPosition(UpdatePersonPositionCommand command) {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
