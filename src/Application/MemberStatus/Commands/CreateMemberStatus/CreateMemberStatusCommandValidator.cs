using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.CreateMemberStatus
{
    public class CreateMemberStatusCommandValidator : AbstractValidator<CreateMemberStatusCommand>
    {
        private IApplicationDbContext _context;
        public CreateMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleFor(v => v.Name).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(MemberStatusNameUnique).WithMessage("Name des Mitgliederstatus wird bereits verwendet!");
        }

        public async Task<bool> MemberStatusNameUnique(CreateMemberStatusCommand model, string name, CancellationToken cancellationToken) {
            return await _context.MemberStatus.AllAsync(c => c.Name != name, cancellationToken);
        }
    }
}
