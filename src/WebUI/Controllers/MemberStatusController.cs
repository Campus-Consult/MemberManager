using System.Threading.Tasks;
using MemberManager.Application.MemberStatuss.Commands.CreateMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.UpdateMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.ChangePersonMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.RemovePersonMemberStatusChange;
using MemberManager.Application.MemberStatuss.Queries.GetAssignSuggestions;
using MemberManager.Application.MemberStatuss.Queries.GetDismissSuggestions;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatus;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatusDetail;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatusHistory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MemberManager.WebUI.Controllers
{
    [Authorize(Policy = "Admin")]
    public class MemberStatusController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<MemberStatusVm>> Get()
        {
            return await Mediator.Send(new GetMemberStatusQuery());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateMemberStatusCommand createCommand)
        {
            return await Mediator.Send(createCommand);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberStatusDetailVm>> Get(int id)
        {
            return await Mediator.Send(new GetMemberStatusDetailQuery { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateMemberStatusCommand updateCommand)
        {
            if (id != updateCommand.MemberStatusId)
            {
               return BadRequest();
            }

            await Mediator.Send(updateCommand);
            return NoContent();
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

        [HttpPost("[action]")]
        public async Task<ActionResult<int>> ChangePersonMemberStatus(ChangePersonMemberStatusCommand command) {
            return await Mediator.Send(command);
        }

        [HttpPost("RemovePersonMemberStatusChange/{PersonMemberStatusId}")]
        public async Task<ActionResult> RemovePersonCareerLevelChange(int PersonMemberStatusId) {
            await Mediator.Send(new RemovePersonMemberStatusChangeCommand { PersonMemberStatusId = PersonMemberStatusId});
            return NoContent();
        }
    }
}
