using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.UpdateMemberStatus
{
    public class UpdateMemberStatusCommandValidator : AbstractValidator<UpdateMemberStatusCommand>
    {
        private IApplicationDbContext _context;
        public UpdateMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleFor(v => v.MemberStatusId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(MemberStatusExists).WithMessage("Mitgliedstatus existiert nicht!");
            RuleFor(v => v.Name).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(MemberStatusNameUnique).WithMessage("Name des Mitgliedstatus wird bereits verwendet!");
        }

        public async Task<bool> MemberStatusExists(UpdateMemberStatusCommand model, int memberStatusId, CancellationToken cancellationToken) {
            return await _context.MemberStatus.FindAsync(memberStatusId) != null;
        }

        public async Task<bool> MemberStatusNameUnique(UpdateMemberStatusCommand model, string name, CancellationToken cancellationToken) {
            return !await _context.MemberStatus.AnyAsync(c => c.Name == name && c.Id != model.MemberStatusId, cancellationToken);
        }
    }
}
