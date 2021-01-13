using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DismissPosition
{
    public class DismissPositionCommandValidator : AbstractValidator<DismissPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Posten existiert nicht.");

            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person existiert nicht.")
                .MustAsync(PersonIsAssigned).WithMessage("Person ist nicht besetzt.");
            
            RuleFor(v => v.DismissDateTime)
                .NotEmpty()
                .MustAsync(DismissDateTimeIsAfterStart).WithMessage("Absetzungsdatum ist nach dem Startdatum.");
        }

        public async Task<bool> PositionExists(DismissPositionCommand model, int positionId, CancellationToken cancellationToken) {
            return await _context.Positions.FindAsync(positionId) != null;
        }

        public async Task<bool> PersonExists(DismissPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> PersonIsAssigned(DismissPositionCommand model, int personId, CancellationToken cancellationToken) {
            return await _context.PersonPositions.AnyAsync(pp => pp.PersonId == personId
                && pp.PositionId == model.Id 
                && pp.EndDateTime == null);
        }

        public async Task<bool> DismissDateTimeIsAfterStart(DismissPositionCommand model, DateTime dismissDateTime, CancellationToken cancellationToken)
        {
            var persPos = await _context.PersonPositions.FirstOrDefaultAsync(pp => pp.PositionId == model.Id
                && pp.PersonId == model.PersonId
                && pp.EndDateTime == null);
            return persPos?.BeginDateTime < dismissDateTime;
        }
    }
}
