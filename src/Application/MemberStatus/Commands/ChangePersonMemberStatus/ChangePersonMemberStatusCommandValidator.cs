using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.ChangePersonMemberStatus
{
    public class ChangePersonMemberStatusCommandValidator : AbstractValidator<ChangePersonMemberStatusCommand>
    {
        private IApplicationDbContext _context;
        public ChangePersonMemberStatusCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.MemberStatusId)
                .NotEmpty()
                .MustAsync(MemberStatusExists).WithMessage("Member Status existiert nicht!");
            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person existiert nicht!");
            
            RuleFor(v => v.ChangeDateTime)
                .NotEmpty()
                .Must(CheckAlreadyHasMemberStatus).WithMessage("Person ist bereits diesem Member Status zugeordnet!");
        }

        public async Task<bool> MemberStatusExists(ChangePersonMemberStatusCommand model, int memberStatusId, CancellationToken cancellationToken) {
            return await _context.MemberStatus.FindAsync(memberStatusId) != null;
        }

        public async Task<bool> PersonExists(ChangePersonMemberStatusCommand model, int personId, CancellationToken cancellationToken) {
            return await _context.People.FindAsync(personId) != null;
        }

        public bool CheckAlreadyHasMemberStatus(ChangePersonMemberStatusCommand model, DateTime time) {
            var previousPersonMemberStatus = _context.PersonMemberStatus
                // has to start before the member status change
                .Where(p => p.PersonId == model.PersonId && p.BeginDateTime < model.ChangeDateTime)
                .AsEnumerable()
                // has to be the last change, compare begin instead of end to make sure it can't be null
                .MaxBy(p => p.BeginDateTime);
            
            return previousPersonMemberStatus == null || previousPersonMemberStatus.MemberStatusId != model.MemberStatusId;
            
        }
    }
}
