using System.Threading.Tasks;
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
    }
}
