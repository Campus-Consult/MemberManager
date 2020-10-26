using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;

namespace MemberManager.Infrastructure.Helpers {
    public static class GraphSdkHelper {

        /// Utility method to create an authenticated Graph client
        /// takes AuthenticationProperties as an argument, which can be
        /// aquired with `(await HttpContext.AuthenticateAsync()).Properties`
        public static IGraphServiceClient GetAuthenticatedClient(AuthenticationProperties props) {
            var accessToken = props.GetTokenValue("access_token");
            if (accessToken == null) {
                throw new ArgumentException("access_token in AuthenticationProperties can't be null!");
            }
            return GetAuthenticatedClient(accessToken);
        }

        public static async Task<IGraphServiceClient> GetGraphServiceClient(this HttpContext httpContext) {
            var accessToken = await httpContext.GetTokenAsync("access_token");
            // var expiresAt = await httpContext.GetTokenAsync("expires_at");
            // Console.WriteLine("expiresAt: " + expiresAt);
            return GetAuthenticatedClient(accessToken);
        }

        public static IGraphServiceClient GetAuthenticatedClient(string accessToken) {
            return new GraphServiceClient(new DelegateAuthenticationProvider(
                requestMessage =>
                {
                    // Append the access token to the request
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    return Task.CompletedTask;
                }));
        }
    }
}