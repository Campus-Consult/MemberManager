using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.RemovePersonCareerLevelChange
{
    public class RemovePersonCareerLevelChangeCommandValidator : AbstractValidator<RemovePersonCareerLevelChangeCommand>
    {
        private IApplicationDbContext _context;
        public RemovePersonCareerLevelChangeCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleFor(v => v.PersonCareerLevelId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .MustAsync(PersonCareerLevelExists).WithMessage("Zuordnung von Person zu Karrierelevel existiert nicht!");
        }

        public async Task<bool> PersonCareerLevelExists(RemovePersonCareerLevelChangeCommand model, int personCareerLevelId, CancellationToken cancellationToken) {
            return await _context.PersonCareerLevels.FindAsync(personCareerLevelId) != null;
        }
    }
}
