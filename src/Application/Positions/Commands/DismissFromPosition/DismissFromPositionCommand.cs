using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DismissFromPosition
{
    public class DismissFromPositionCommand : IRequest
    {
        public int PositionId { get; set; }
        public int PersonId { get; set; }
        public DateTime DismissalDateTime { get; set; }
    }

    public class DismissFromPositionCommandHandler : IRequestHandler<DismissFromPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissFromPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DismissFromPositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PersonPositions.FirstAsync(pp => pp.PersonId == request.PersonId
                && pp.PositionId == request.PositionId
                && pp.EndDateTime == null, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Position));
            }

            entity.EndDateTime = request.DismissalDateTime;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
