using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            await _identityService.AddUserToRole(request.Email, "Admin");
            return Unit.Value;
        }
    }
}
