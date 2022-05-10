using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.ChangePersonCareerLevel
{
    public class ChangePersonCareerLevelCommandValidator : AbstractValidator<ChangePersonCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public ChangePersonCareerLevelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.CareerLevelId)
                .NotEmpty()
                .MustAsync(CareerLevelExists).WithMessage("Karrierelevel existiert nicht!");
            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person existiert nicht!");
            
            RuleFor(v => v.ChangeDateTime)
                .NotEmpty()
                .MustAsync(CheckAlreadyHasCareerLevel).WithMessage("Person ist bereits diesem Karrierelevel zugeordnet!");
        }

        public async Task<bool> CareerLevelExists(ChangePersonCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> PersonExists(ChangePersonCareerLevelCommand model, int personId, CancellationToken cancellationToken) {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> CheckAlreadyHasCareerLevel(ChangePersonCareerLevelCommand model, DateTime time, CancellationToken cancellationToken) {
            var previousPersonCareerLevel = (await _context.PersonCareerLevels
                // has to start before the careerlevel change
                .Where(p => p.PersonId == model.PersonId && p.BeginDateTime < model.ChangeDateTime)
                .ToListAsync())
                .DefaultIfEmpty()
                // has to be the career level change
                // it doesn't matter if BeginDateTime or EndDateTimes are compared, because their ordering will always be the same
                .Aggregate((latest,p) => p.BeginDateTime > latest.BeginDateTime ? p : latest);
            
            return previousPersonCareerLevel == null || previousPersonCareerLevel.CareerLevelId != model.CareerLevelId;
            
        }
    }
}
