using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.RemovePersonMemberStatusChange
{
    public class RemovePersonMemberStatusChangeCommandValidator : AbstractValidator<RemovePersonMemberStatusChangeCommand>
    {
        private IApplicationDbContext _context;
        public RemovePersonMemberStatusChangeCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.PersonMemberStatusId)
                .NotNull()
                .MustAsync(PersonMemberStatusExists).WithMessage("Zuordnung von Person zu Member Status existiert nicht!");
        }

        public async Task<bool> PersonMemberStatusExists(RemovePersonMemberStatusChangeCommand model, int personMemberStatusId, CancellationToken cancellationToken) {
            return await _context.PersonMemberStatus.FindAsync(new object[] {personMemberStatusId}, cancellationToken) != null;
        }
    }
}
