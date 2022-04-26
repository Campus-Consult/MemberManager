using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.MemberStatuss.Commands.AssignToMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.CreateMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.DismissFromMemberStatus;
using MemberManager.Application.MemberStatuss.Commands.UpdateMemberStatus;
using MemberManager.Application.Events.Queries.GetAllEvents;
using MemberManager.Application.Events.Common;
using MemberManager.Application.MemberStatuss.Queries.GetDismissSuggestions;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatus;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatusDetail;
using MemberManager.Application.MemberStatuss.Queries.GetMemberStatusHistory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MemberManager.WebUI.Controllers
{
    [Authorize]
    public class EventController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<EventLookupDto>>> Get()
        {
            return await Mediator.Send(new GetAllEventsQuery());
        }

    }
}
