using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.Events.Commands.CreateEvent;
using MemberManager.Application.Events.Commands.UpdateEvent;
using MemberManager.Application.Events.Queries.GetAllEvents;
using MemberManager.Application.Events.Queries.GetEventDetails;
using MemberManager.Application.Events.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MemberManager.WebUI.Controllers
{
    [Authorize]
    public class EventController : ApiController
    {
        [Authorize(Policy = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<EventLookupDto>>> Get()
        {
            return await Mediator.Send(new GetAllEventsQuery());
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDetailDto>> GetSingle(int id)
        {
            return await Mediator.Send(new GetEventDetailsQuery{ EventId = id});
        }

        [Authorize(Policy = "Admin")]
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateEventCommand cmd) {
            return await Mediator.Send(cmd);
        }

        [Authorize(Policy = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateEventCommand cmd) {
            if (id != cmd.Id)
            {
               return BadRequest();
            }

            await Mediator.Send(cmd);
            return NoContent();
        }

    }
}
