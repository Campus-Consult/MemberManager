using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.AttendEvent
{
    public class AttendEventCommand : IRequest
    {
        public int EventId { get; set; }
        public string EventSecretKey { get; set; }
    }

    public class AttendEventCommandHandler : IRequestHandler<AttendEventCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTime;
        private readonly ICurrentUserService _currentUser;

        public AttendEventCommandHandler(IApplicationDbContext context, IDateTime dateTime, ICurrentUserService currentUser)
        {
            _context = context;
            _dateTime = dateTime;
            _currentUser = currentUser;
        }

        public async Task Handle(AttendEventCommand request, CancellationToken cancellationToken)
        {
            var now = _dateTime.Now;
            var attendeeEmail = _currentUser.GetEmailAssociate();
            
            var attendee = await _context.People.FirstOrDefaultAsync(p => attendeeEmail == p.EmailAssociaton);

            // ignore if the user already attends
            if (!(await _context.EventAnswers.AnyAsync(a => a.EventId == request.EventId && a.PersonId == attendee.Id, cancellationToken))) {
                _context.EventAnswers.Add(new EventAnswer() {
                    AnswerKind = EventAnswerKind.Accept,
                    Person = attendee,
                    EventId = request.EventId,
                    Time = _dateTime.Now,
                });

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
