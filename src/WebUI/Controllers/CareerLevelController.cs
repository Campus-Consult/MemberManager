using MemberManager.Application.CareerLevels.Commands.ChangePersonCareerLevel;
using MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand;
using MemberManager.Application.CareerLevels.Commands.RemovePersonCareerLevelChange;
using MemberManager.Application.CareerLevels.Commands.UpdateCareerLevelCommand;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelHistory;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevels;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
    public class CareerLevelController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<CareerLevelsVm>> Get()
        {
            return await Mediator.Send(new GetCareerLevelsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CareerLevelDto>> Get(int id)
        {
           return await Mediator.Send(new GetCareerLevelWithAssigneesQuery { CareerLevelId = id });
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateCareerLevelCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateCareerLevelCommand command)
        {
            if (id != command.CareerLevelId)
            {
               return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<CareerLevelHistoryVm>> GetHistory(int id) {
            return await Mediator.Send(new GetCareerLevelHistoryQuery{ CareerLevelId = id });
        }


        [HttpPost("{id}/[action]")]
        public async Task<ActionResult<int>> ChangePersonCareerLevel(int id, ChangePersonCareerLevelCommand command) {
            if (id != command.CareerLevelId)
            {
                return BadRequest();
            }
            return await Mediator.Send(command);
        }

        [HttpPost("RemovePersonCareerLevelChange/{PersonCareerLevelId}")]
        public async Task<ActionResult> RemovePersonCareerLevelChange(int PersonCareerLevelId) {
            await Mediator.Send(new RemovePersonCareerLevelChangeCommand{ PersonCareerLevelId = PersonCareerLevelId});
            return NoContent();
        }
    }
}
