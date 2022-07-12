using MediatR;
using MemberManager.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.RemoveEventAnswer
{
    public class RemoveEventAnswerCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class RemoveEventAnswerCommandHandler : IRequestHandler<RemoveEventAnswerCommand>
    {
        private readonly IApplicationDbContext _context;

        public RemoveEventAnswerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RemoveEventAnswerCommand request, CancellationToken cancellationToken)
        {
            
            var evnt = await _context.EventAnswers.FindAsync(new object [] {request.Id}, cancellationToken);

            _context.EventAnswers.Remove(evnt);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
