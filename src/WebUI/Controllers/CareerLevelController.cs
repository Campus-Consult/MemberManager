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
    }
}
