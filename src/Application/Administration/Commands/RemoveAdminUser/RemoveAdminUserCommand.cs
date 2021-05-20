using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.Administration.Commands.RemoveAdminUser
{
    public class RemoveAdminUserCommand : IRequest
    {
        public String Email { get; set; }
    }

    // TODO: verify that user exists
    public class RemoveAdminUserCommandHandler : IRequestHandler<RemoveAdminUserCommand>
    {
        private readonly IIdentityService _identityService;

        public RemoveAdminUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Unit> Handle(RemoveAdminUserCommand request, CancellationToken cancellationToken)
        {
            await _identityService.RemoveUserFromRole(request.Email, "Admin");
            return Unit.Value;
        }
    }
}
