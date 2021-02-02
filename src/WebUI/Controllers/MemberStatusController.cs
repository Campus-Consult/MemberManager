using System.Threading.Tasks;
using MemberManager.Application.MemberStatus.Commands.AssignToMemberStatus;
using MemberManager.Application.MemberStatus.Commands.DismissFromMemberStatus;
using MemberManager.Application.MemberStatus.Queries.GetAssignSuggestions;
using MemberManager.Application.MemberStatus.Queries.GetDismissSuggestions;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatus;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatusDetail;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatusHistory;
using Microsoft.AspNetCore.Mvc;

namespace MemberManager.WebUI.Controllers
{
    public class MemberStatusController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<MemberStatusVm>> Get()
        {
            return await Mediator.Send(new GetMemberStatusQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberStatusDetailVm>> Get(int id)
        {
            return await Mediator.Send(new GetMemberStatusDetailQuery { Id = id });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<MemberStatusHistoryVm>> GetHistory(int id)
        {
            return await Mediator.Send(new GetMemberStatusHistoryQuery { Id = id });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PeopleAssignSuggestions>> GetAssignSuggestions(int id)
        {
            return await Mediator.Send(new GetAssignSuggestionsQuery { MemberStatusId = id });
        }

        [HttpGet("{id}/[action]")]
        public async Task<ActionResult<PeopleDismissSuggestions>> GetDismissSuggestions(int id)
        {
            return await Mediator.Send(new GetDismissSuggestionsQuery { MemberStatusId = id });
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Assign(int id, AssignToMemberStatusCommand command)
        {
            if (id != command?.MemberStatusId)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Dismiss(int id, DismissFromMemberStatusCommand command)
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
