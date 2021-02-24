using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.DismissFromMemberStatus
{
    public class DismissFromMemberStatusCommandValidator : AbstractValidator<DismissFromMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissFromMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.MemberStatusId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(MemberStatusExists).WithMessage("MemberStatus does not exits.");

            RuleFor(v => v.PersonId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person does not exist.")
                .MustAsync(PersonIsAssignedAlready).WithMessage("Person is not assigned.");

            RuleFor(v => v.DismissalDateTime).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty();
        }

        public async Task<bool> MemberStatusExists(DismissFromMemberStatusCommand model, int Id, CancellationToken cancellationToken)
        {
            return (await _context.MemberStatus.FindAsync(Id) != null);
        }

        public async Task<bool> PersonExists(DismissFromMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return (await _context.People.FindAsync(personId) != null);
        }

        public async Task<bool> PersonIsAssignedAlready(DismissFromMemberStatusCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.PersonMemberStatus
                .Where(pms => pms.PersonId == personId && pms.MemberStatusId == model.MemberStatusId)
                .AnyAsync(pms => pms.BeginDateTime <= model.DismissalDateTime && (pms.EndDateTime == null || pms.EndDateTime >= model.DismissalDateTime));
        }
    }
}
