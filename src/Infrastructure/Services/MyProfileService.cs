using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Logging;
using System.Linq;

// https://stackoverflow.com/a/64188170
public class MyProfileService : IProfileService
{
    private readonly ILogger<MyProfileService> _logger;
    public MyProfileService(ILogger<MyProfileService> logger) {
        _logger = logger;
    }

    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        //get role claims from ClaimsPrincipal 
        var roleClaims = context.Subject.FindAll(JwtClaimTypes.Role);

        _logger.LogWarning("RoleClaims");
        foreach (var claim in roleClaims) {
            _logger.LogWarning(claim.ToString());
        }

        //add your role claims 
        context.IssuedClaims.AddRange(roleClaims);
        return Task.CompletedTask;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        // await base.IsActiveAsync(context);
        return Task.CompletedTask;
    }
}