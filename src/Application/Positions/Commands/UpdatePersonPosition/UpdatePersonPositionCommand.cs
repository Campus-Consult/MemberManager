using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.UpdatePersonPosition
{
    public class UpdatePersonPositionCommand : IRequest
    {
        public int PersonPositionId { get; set; }
        public DateTime AssignmentDateTime { get; set; }
        public DateTime? DismissalDateTime { get; set; }
    }

    public class UpdatePersonPositionCommandHandler : IRequestHandler<UpdatePersonPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePersonPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdatePersonPositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PersonPositions.FindAsync(request.PersonPositionId);

            entity.BeginDateTime = request.AssignmentDateTime;
            entity.EndDateTime = request.DismissalDateTime;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
