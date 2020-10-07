using MemberManager.Application.Positions.Commands.AssignPosition;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.Positions.Queries.GetPositions;
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

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePositionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id/*, UpdatePositionCommand command*/)
        {
            //if (id != command.Id)
            //{
            //    return BadRequest();
            //}

            //await Mediator.Send(command);

            return NoContent();
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
