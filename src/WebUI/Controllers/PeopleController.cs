using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.People.Commands.DeletePerson;
using MemberManager.Application.People.Commands.UpdatePerson;
using MemberManager.Application.People.Queries.GetPeople;
using MemberManager.Application.People.Queries.GetPersonDetail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
    public class PeopleController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<PeopleVm>> Get()
        {
            return await Mediator.Send(new GetPeopleQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonDetailVm>> Get(int id)
        {
            return await Mediator.Send(new GetPersonDetailQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePersonCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdatePersonCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeletePersonCommand { Id = id });

            return NoContent();
        }
    }
}
