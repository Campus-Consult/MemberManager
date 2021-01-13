using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DismissPosition
{
    public class DismissPositionCommand : IRequest
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DateTime DismissDateTime { get; set; }
    }

    public class DismissPositionCommandHandler : IRequestHandler<DismissPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DismissPositionCommand request, CancellationToken cancellationToken)
        {
            var persPos = await _context.PersonPositions.FirstAsync(pp => pp.PersonId == request.PersonId
                && pp.PositionId == request.Id
                && pp.EndDateTime == null, cancellationToken);
            persPos.EndDateTime = request.DismissDateTime;
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
