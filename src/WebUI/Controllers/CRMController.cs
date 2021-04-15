using MemberManager.Application.CRM.Contacts.Queries.GetContactDetails;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
    public class CRMController : ApiController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDetailVm>> Get(int id)
        {
            return await Mediator.Send(new GetContactDetailsQuery { Id = id });
        }
    }
}
