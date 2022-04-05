using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;
using MemberManager.Domain.Enums;
using MemberManager.Application.People.Commands.CreatePerson;

namespace MemberManager.Application.People.Commands.CreatePersonWithLevelStatus
{
    public class CreatePersonWithLevelStatusCommand : CreatePersonCommand
    {
        public int InitialCareerLevelId { get; set; }
        public int InitialMemberStatusId { get; set; }
        public DateTime? JoinDate { get; set; }
    }

    public class CreatePersonWithLevelStatusCommandHandler : IRequestHandler<CreatePersonWithLevelStatusCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTimeService;
        private readonly IMediator _mediator;

        public CreatePersonWithLevelStatusCommandHandler(IApplicationDbContext context, IDateTime dateTimeService, IMediator mediator)
        {
            _context = context;
            _dateTimeService = dateTimeService;
            _mediator = mediator;
        }

        public async Task<int> Handle(CreatePersonWithLevelStatusCommand request, CancellationToken cancellationToken)
        {
            // TODO: is there a better way to do this?
            var createCommand = new CreatePersonCommand {
                AdressCity = request.AdressCity,
                AdressNo = request.AdressNo,
                AdressStreet = request.AdressStreet,
                AdressZIP = request.AdressZIP,
                Birthdate = request.Birthdate,
                EmailAssociaton = request.EmailAssociaton,
                EmailPrivate = request.EmailPrivate,
                FirstName = request.FirstName,
                Gender = request.Gender,
                MobilePrivate = request.MobilePrivate,
                Surname = request.Surname,
            };
            var memberId = await _mediator.Send(createCommand);

            var joinDateTime = request.JoinDate ?? _dateTimeService.Now;

            _context.PersonMemberStatus.Add(new PersonMemberStatus {
                BeginDateTime = joinDateTime,
                EndDateTime = null,
                MemberStatusId = request.InitialMemberStatusId,
                PersonId = memberId,
            });

            _context.PersonCareerLevels.Add(new PersonCareerLevel {
                BeginDateTime = joinDateTime,
                EndDateTime = null,
                CareerLevelId = request.InitialCareerLevelId,
                PersonId = memberId,
            });

            await _context.SaveChangesAsync(cancellationToken);

            return memberId;
        }
    }
}
