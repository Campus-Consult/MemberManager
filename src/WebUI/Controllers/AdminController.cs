using MemberManager.Application.Administration.Queries.GetCurrentAdministrators;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MemberManager.Application.Administration.Commands.AddAdminUser;
using MemberManager.Application.Administration.Commands.RemoveAdminUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using MemberManager.Infrastructure.Identity;
using System.Security.Claims;
using System;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace MemberManager.WebUI.Controllers
{
    // [Authorize(Roles = "Admin")]
    [Authorize]
    public class AdminController : ApiController
    {
        private readonly UserManager<ApplicationUser> _userMng;
        private readonly ILogger<AdminController> _logger;
        public AdminController(UserManager<ApplicationUser> userMng, ILogger<AdminController> logger) {
            _userMng = userMng;
            _logger = logger;
        }
        [HttpGet]
        public async Task<ActionResult<List<string>>> GetCurrentAdmins()
        {
            // try {
            //     var user = await _userMng.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Name));
            //     _logger.LogInformation("got user: "+user.Email);
            // } catch(Exception e) {
            //     _logger.LogError(e.ToString());
            // }
            // var roles = await _userMng.GetRolesAsync(await _userMng.GetUserAsync(User));
            // return User.Claims.Select(x => x.ValueType+""+x.Value).ToList();
            return await Mediator.Send(new GetCurrentAdministratorsQuery());
        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddAdmin(AddAdminUserCommand command) {
            await Mediator.Send(new AddAdminUserCommand {
                Email = command.Email
            });
            return NoContent();
        }

        [HttpPost("Remove")]
        public async Task<ActionResult> RemoveAdmin(RemoveAdminUserCommand command) {
            await Mediator.Send(new RemoveAdminUserCommand {
                Email = command.Email
            });
            return NoContent();
        }

    }
}
