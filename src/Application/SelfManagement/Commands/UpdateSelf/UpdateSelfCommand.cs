using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Application.People.Commands.UpdatePerson;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.SelfManagement.Commands.UpdateSelf
{
    public class UpdateSelfCommand : IRequest
    {
        public string Email { get; set; }
        public UpdatePersonCommand UpdateCommand { get; set; }
    }

    public class UpdateSelfCommandHandler : IRequestHandler<UpdateSelfCommand>
    {
        private readonly IMediator _mediator;

        public UpdateSelfCommandHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public Task<Unit> Handle(UpdateSelfCommand request, CancellationToken cancellationToken)
        {
            // person id and emailassociate has been checked in the validator
            return _mediator.Send(request.UpdateCommand);
        }
    }
}
