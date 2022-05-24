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

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Posten existiert nicht.")
                .MustAsync(PositionIsNotDeactivatedAlready).WithMessage("Posten ist bereits deaktiviert.")
                .MustAsync(PositionEndsBeforeLastActive).WithMessage("Posten kann nur zu einem Zeitpunkt deaktiviert werden, wenn in der Zukunft keine Personen mehr zugewiesen werden!");
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
