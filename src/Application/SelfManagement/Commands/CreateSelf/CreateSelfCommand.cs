using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.People.Commands.UpdatePerson;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.SelfManagement.Commands.CreateSelf
{
    public class CreateSelfCommand : IRequest<int>
    {
        public string Email { get; set; }
        public CreatePersonCommand CreateCommand { get; set; }
    }

    public class CreateSelfCommandHandler : IRequestHandler<CreateSelfCommand, int>
    {
        private readonly IMediator _mediator;

        public CreateSelfCommandHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public Task<int> Handle(CreateSelfCommand request, CancellationToken cancellationToken)
        {
            // person id and emailassociate has been checked in the validator
            return _mediator.Send(request.CreateCommand);
        }
    }
}
