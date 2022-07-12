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

namespace MemberManager.Application.Events.Commands.AddEventAnswer
{
    public class AddEventAnswerCommand : IRequest<int>
    {
        public int EventId { get; set; }
        public int PersonId { get; set; }
        public DateTime AnswerTime { get; set; }
    }

    public class AddEventAnswerCommandHandler : IRequestHandler<AddEventAnswerCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public AddEventAnswerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddEventAnswerCommand request, CancellationToken cancellationToken)
        {
            var answer = _context.EventAnswers.Add(new EventAnswer() {
                AnswerKind = EventAnswerKind.Accept,
                PersonId = request.PersonId,
                EventId = request.EventId,
                Time = request.AnswerTime,
            });

            await _context.SaveChangesAsync(cancellationToken);

            return answer.Entity.Id;
        }
    }
}
