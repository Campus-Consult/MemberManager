using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MemberManager.Application.Common.Exceptions;

namespace MemberManager.Application.Administration.Commands.AddAdminUser
{
    public class AddAdminUserCommand : IRequest
    {
        public String Email { get; set; }
    }

    // TODO: verify that user exists
    public class AddAdminUserCommandHandler : IRequestHandler<AddAdminUserCommand>
    {
        private readonly IIdentityService _identityService;

        public AddAdminUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Unit> Handle(AddAdminUserCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.AddUserToRole(request.Email, "Admin");
            if(!result.Succeeded)
            {
                throw new MultiErrorException(result.Errors);
            }
            return Unit.Value;
        }
    }
}
