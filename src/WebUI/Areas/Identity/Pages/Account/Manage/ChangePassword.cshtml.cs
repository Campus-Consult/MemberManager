using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
namespace MemberManager.WebUI.Areas.Identity.Pages.Account.Manage
{
    public class ChangePasswordModel : PageModel
    {
        public IActionResult OnGet()
        {
            return RedirectToPage("Index");
        }

        public IActionResult OnPostAsync()
        {
            return RedirectToPage("Index");
        }
    }
}
