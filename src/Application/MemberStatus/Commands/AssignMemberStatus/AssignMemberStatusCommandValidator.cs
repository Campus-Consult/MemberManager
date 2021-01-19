using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.AssignMemberStatus
{
    public class AssignMemberStatusCommandValidator : AbstractValidator<AssignMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person does not exist.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person is already assigned.");

            RuleFor(v => v.AssignmentDateTime)
                .NotEmpty();
        }

        public async Task<bool> PersonExists(AssignMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return (await _context.People.FindAsync(personId) != null);
        }

        public async Task<bool> PersonIsNotAssignedAlready(AssignMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return !await _context.PersonMemberStatus
                .Where(pms => pms.PersonId == personId && pms.MemberStatusId == model.Id)
                .AnyAsync(pms => pms.BeginDateTime <= model.AssignmentDateTime && (pms.EndDateTime == null || pms.EndDateTime >= model.AssignmentDateTime));
        }
    }
}
