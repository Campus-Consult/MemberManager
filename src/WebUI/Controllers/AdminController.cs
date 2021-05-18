using MemberManager.Application.Administration.Queries.GetCurrentAdministrators;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace MemberManager.WebUI.Controllers
{
    public class AdminController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<string>>> GetCurrentAdmins()
        {
            return await Mediator.Send(new GetCurrentAdministratorsQuery());
        }

    }
}
