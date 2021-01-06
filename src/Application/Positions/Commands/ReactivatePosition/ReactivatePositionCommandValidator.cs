using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.ReactivatePosition
{
    public class ReactivatePositionCommandValidator : AbstractValidator<ReactivatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public ReactivatePositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Poition existiert nicht.")
                .MustAsync(PositionIsNotActiveAlready).WithMessage("Position ist bereits aktiv.");
        }

        public async Task<bool> PositionExists(ReactivatePositionCommand model, int positionId, CancellationToken cancellationToken)
        {
            return (await _context.Positions.FindAsync(positionId, cancellationToken) != null);
        }

        public async Task<bool> PositionIsNotActiveAlready(ReactivatePositionCommand model, int positionId, CancellationToken cancellationToken)
        {
            return (await _context.Positions.FindAsync(positionId, cancellationToken)).IsActive;
        }
    }
}
