using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.UpdatePosition
{
    public class UpdatePositionCommandValidator : AbstractValidator<UpdatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Position does not exists.")
                .MustAsync(PositionNameUnique).WithMessage("Position name already exists.")
                .MustAsync(PositionExists).WithMessage("Position shortname already exists.");
        }

        public async Task<bool> PositionExists(UpdatePositionCommand model, int positionId, CancellationToken cancellationToken) {
            return await _context.Positions.FindAsync(positionId, cancellationToken) != null;
        }

        public async Task<bool> PositionNameUnique(UpdatePositionCommand model, int positionId, CancellationToken cancellationToken) {
            return !await _context.Positions.AnyAsync(p => p.Name == model.Name);
        }

        public async Task<bool> PositionShortNameUnique(UpdatePositionCommand model, int positionId, CancellationToken cancellationToken) {
            return !await _context.Positions.AnyAsync(p => p.ShortName == model.ShortName);
        }
    }
}
