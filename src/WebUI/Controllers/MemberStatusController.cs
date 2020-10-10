using System.Threading.Tasks;
using MemberManager.Application.MemberStatus.Queries.GetMemberStatus;
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
    }
}
