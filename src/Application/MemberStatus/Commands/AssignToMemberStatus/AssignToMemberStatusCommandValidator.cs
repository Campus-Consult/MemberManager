using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.AssignToMemberStatus
{
    public class AssignToMemberStatusCommandValidator : AbstractValidator<AssignToMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignToMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.PersonId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person does not exist.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person is already assigned.");

            RuleFor(v => v.MemberStatusId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(MemberStatusExists).WithMessage("Member status does not exist.");

            RuleFor(v => v.AssignmentDateTime).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty();
        }

        public async Task<bool> MemberStatusExists(AssignToMemberStatusCommand model, int memberStatusId, CancellationToken cancellationToken)
        {
            return await _context.MemberStatus.FindAsync(memberStatusId) != null;
        }

        public async Task<bool> PersonExists(AssignToMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> PersonIsNotAssignedAlready(AssignToMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return !await _context.PersonMemberStatus
                .Where(pms => pms.PersonId == personId && pms.MemberStatusId == model.MemberStatusId)
                .AnyAsync(pms => pms.BeginDateTime <= model.AssignmentDateTime && (pms.EndDateTime == null || pms.EndDateTime >= model.AssignmentDateTime));
        }
    }
}
