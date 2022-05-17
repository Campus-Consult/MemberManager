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

namespace MemberManager.Application.Events.Commands.VisitEvent
{
    public class VisitEventCommand : IRequest
    {
        public int EventId { get; set; }
        public string EventSecretKey { get; set; }
        public string AttendeeEmail { get; set; }
    }

    public class VisitEventCommandHandler : IRequestHandler<VisitEventCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTime;

        public VisitEventCommandHandler(IApplicationDbContext context, IDateTime dateTime)
        {
            _context = context;
            _dateTime = dateTime;
        }

        public async Task<Unit> Handle(VisitEventCommand request, CancellationToken cancellationToken)
        {
            var now = _dateTime.Now;
            
            var attendee = await _context.People.FirstOrDefaultAsync(p => request.AttendeeEmail == p.EmailAssociaton);

            _context.EventAnswers.Add(new EventAnswer() {
                AnswerKind = EventAnswerKind.Accept,
                Person = attendee,
                EventId = request.EventId,
            });

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
