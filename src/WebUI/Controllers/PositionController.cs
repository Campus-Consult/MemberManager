using MemberManager.Application.Positions.Commands.AssignPosition;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.Positions.Queries.GetAssignSuggestions;
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

        //[HttpGet("{id}")]
        //public async Task<ActionResult<PositionDetailVm>> Get(int id)
        //{
        //    return await Mediator.Send(new GetPositionDetailQuery { Id = id });
        //}

        [HttpGet("[action]")]
        public async Task<ActionResult<PositionsWAVm>> GetWithAssignees() {
            return await Mediator.Send(new GetPositionsWithAssigneesQuery());
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<PeopleAssignSuggestions>> AssignSuggestions(int positionID) {
            return await Mediator.Send(new GetAssignSuggestionsQuery{PositionID = positionID});
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePositionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public Task<ActionResult> Update(int id/*, UpdatePositionCommand command*/)
        {
            //if (id != command.Id)
            //{
            //    return BadRequest();
            //}

            //await Mediator.Send(command);

            return Task.FromResult<ActionResult>(NoContent());
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> Deactivate(int id, DeactivatePositionCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> Assign(int id, AssignPositionCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
