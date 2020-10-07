using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DeactivatePosition
{
    public class DeactivatePositionCommand : IRequest
    {
        public int Id { get; set; }

        public DateTime EndDateTime { get; set; }
    }

    public class DeactivatePositionCommandHandler : IRequestHandler<DeactivatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeactivatePositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeactivatePositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Position), request.Id);
            }

            foreach (var assignment in entity.PersonPositions)
            {
                if (!assignment.EndDateTime.HasValue)
                {
                    assignment.EndDateTime = request.EndDateTime;
                }
            }

            entity.IsActive = false;


            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
