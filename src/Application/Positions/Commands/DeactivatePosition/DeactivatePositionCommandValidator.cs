using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DeactivatePosition
{
    public class DeactivatePositionCommandValidator : AbstractValidator<DeactivatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeactivatePositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Id)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Position does not exist.")
                .MustAsync(PositionIsNotDeactivatedAlready).WithMessage("Position is already deactivated.")
                .MustAsync(PositionEndsBeforeLastActive).WithMessage("Can only deactivate a Position after the latest person was assigned to it!");
        }

        public async Task<bool> PositionExists(DeactivatePositionCommand model, int positionId, CancellationToken cancellationTokenn)
        {
            return (await _context.Positions.FindAsync(new object[] {positionId}, cancellationTokenn) != null);
        }

        public async Task<bool> PositionIsNotDeactivatedAlready(DeactivatePositionCommand model, int positionId, CancellationToken cancellationToken)
        {
            return (await _context.Positions.FindAsync(new object[] {positionId}, cancellationToken))?.IsActive ?? true;
        }

        public async Task<bool> PositionEndsBeforeLastActive(DeactivatePositionCommand model, int positionId, CancellationToken cancellationToken) {
            return !await _context.PersonPositions
                .Where(p => p.PositionId == positionId && p.BeginDateTime > model.EndDateTime)
                .AnyAsync(cancellationToken);
        }
    }
}
