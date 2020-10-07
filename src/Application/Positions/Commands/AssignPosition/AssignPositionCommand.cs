using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.AssignPosition
{
    public class AssignPositionCommand : IRequest
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DateTime AssignmentDateTime { get; set; }
    }

    public class AssignPositionCommandHandler : IRequestHandler<AssignPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(AssignPositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions.FindAsync(request.Id);

            if(entity == null)
            {
                throw new NotFoundException(nameof(Position));
            }

            entity.PersonPositions.Add(
                new PersonPosition()
                {
                    PositionId = request.Id,
                    PersonId = request.PersonId,
                    BeginDateTime = request.AssignmentDateTime,
                }
            );

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
