using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
namespace MemberManager.WebUI.Areas.Identity.Pages.Account.Manage
{
    public class ChangePasswordModel : PageModel
    {
        public async Task<IActionResult> OnGetAsync()
        {
            return RedirectToPage("Manage");
        }

        public async Task<IActionResult> OnPostAsync()
        {
            return RedirectToPage("Manage");
        }
    }
}
