using MemberManager.Application.Positions.Commands.AssignToPosition;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.Positions.Commands.DismissFromPosition;
using MemberManager.Application.Positions.Commands.ReactivatePosition;
using MemberManager.Application.Positions.Commands.UpdatePosition;
using MemberManager.Application.Positions.Queries.GetAssignSuggestions;
using MemberManager.Application.Positions.Queries.GetPositionDetails;
using MemberManager.Application.Positions.Queries.GetPositions;
using MemberManager.Application.Positions.Queries.GetPositionsWithAssignees;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
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
        public async Task<ActionResult<PositionsWAVm>> GetWithAssignees(bool history) {
            return await Mediator.Send(new GetPositionsWithAssigneesQuery{
                IncludeHistory = history,
            });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PeopleAssignSuggestions>> AssignSuggestions(int id) {
            return await Mediator.Send(new GetAssignSuggestionsQuery{PositionID = id});
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
    }
}
