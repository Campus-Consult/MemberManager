using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.AssignPosition
{
    public class AssignPositionCommandValidator : AbstractValidator<AssignPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person does not exist.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person is already assigned.");

            RuleFor(v => v.AssignmentDateTime)
                .NotEmpty();
        }

        public async Task<bool> PersonExists(AssignPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return (await _context.People.FindAsync(personId) != null);
        }

        public async Task<bool> PersonIsNotAssignedAlready(AssignPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.PersonPositions
                .Where(pp => pp.PersonId == personId)
                .FirstAsync(pp => pp.BeginDateTime <= model.AssignmentDateTime && (pp.EndDateTime == null || pp.EndDateTime >= model.AssignmentDateTime)) == null;
        }
    }
}
