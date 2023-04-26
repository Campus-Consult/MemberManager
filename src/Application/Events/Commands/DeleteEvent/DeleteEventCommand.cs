using MediatR;
using MemberManager.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.DeleteEvent
{
    public class DeleteEventCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteEventCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteEventCommand request, CancellationToken cancellationToken)
        {
            
            var evnt = await _context.Events.FindAsync(new object [] {request.Id}, cancellationToken);

            _context.Events.Remove(evnt);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
