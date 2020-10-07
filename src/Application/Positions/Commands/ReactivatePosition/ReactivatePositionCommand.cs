using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.ReactivatePosition
{
    public class ReactivatePositionCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class ReactivatiePositionCommandHandler : IRequestHandler<ReactivatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public ReactivatiePositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ReactivatePositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Position), request.Id);
            }

            entity.IsActive = true;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
