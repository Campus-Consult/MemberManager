using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.DismissFromPosition
{
    public class DismissFromPositionCommandValidator : AbstractValidator<DismissFromPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissFromPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.PositionId)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Posten existiert nicht.");

            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person existiert nicht.")
                .MustAsync(PersonIsAssignedAlready).WithMessage("Person ist nicht besetzt.");

            RuleFor(v => v.DismissalDateTime)
                .NotEmpty();
        }

        public async Task<bool> PositionExists(DismissFromPositionCommand model, int positionId, CancellationToken cancellationToken) 
        {
            return await _context.Positions.FindAsync(positionId) != null;
        }

        public async Task<bool> PersonExists(DismissFromPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> PersonIsAssignedAlready(DismissFromPositionCommand model, int personId, CancellationToken cancellationToken) {
            return await _context.PersonPositions
                .Where(pp => pp.PersonId == personId && pp.PositionId == model.PositionId)
                .AnyAsync(pp => pp.BeginDateTime <= model.DismissalDateTime && (pp.EndDateTime == null || pp.EndDateTime >= model.DismissalDateTime));
        }
    }
}
