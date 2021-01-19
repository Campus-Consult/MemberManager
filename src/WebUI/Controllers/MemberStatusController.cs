using System.Threading.Tasks;
using MemberManager.Application.MemberStatus.Commands.AssignMemberStatus;
using MemberManager.Application.MemberStatus.Commands.DismissFromMemberStatus;
using MemberManager.Application.MemberStatus.Queries.GetAssignSuggestions;
using MemberManager.Application.MemberStatus.Queries.GetDismissSuggestions;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatus;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatusDetail;
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

        //    [HttpGet("[action]")]
        //    public async Task<ActionResult<MemberStatusWAVm>> GetWithAssignees(bool history)
        //    {
        //        return await Mediator.Send(new GetMemberStatusWithAssigneesQuery
        //        {
        //            IncludeHistory = history,
        //        });
        //    }

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

        //    [HttpPost]
        //    public async Task<ActionResult<int>> Create(CreateMemberStatusCommand command)
        //    {
        //        return await Mediator.Send(command);
        //    }

        //    [HttpPut("{id}")]
        //    public async Task<ActionResult> Update(int id, UpdateMemberStatusCommand command)
        //    {
        //        if (id != command.Id)
        //        {
        //            return BadRequest();
        //        }

        //        await Mediator.Send(command);

        //        return NoContent();
        //    }

        //    [HttpPost("{id}/[action]")]
        //    public async Task<ActionResult> Deactivate(int id, DeactivateMemberStatusCommand command)
        //    {
        //        if (id != command.Id)
        //        {
        //            return BadRequest();
        //        }

        //        await Mediator.Send(command);

        //        return NoContent();
        //    }

        //    [HttpPost("{id}/[action]")]
        //    public async Task<ActionResult> Reactivate(int id, ReactivateMemberStatusCommand command)
        //    {
        //        if (id != command.Id)
        //        {
        //            return BadRequest();
        //        }

        //        await Mediator.Send(command);

        //        return NoContent();
        //    }

        [HttpPost("{id}/[action]")]
        public async Task<ActionResult> Assign(int id, AssignMemberStatusCommand command)
        {
            if (id != command?.Id)
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
