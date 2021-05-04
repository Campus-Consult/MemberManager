using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MemberManager.WebUI.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
