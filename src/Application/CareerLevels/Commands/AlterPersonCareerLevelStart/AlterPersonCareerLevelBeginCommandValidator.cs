using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.AlterPersonCareerLevelStart
{
    public class AlterPersonCareerLevelStartCommandValidator : AbstractValidator<AlterPersonCareerLevelStartCommand>
    {
        private IApplicationDbContext _context;
        public AlterPersonCareerLevelStartCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.PersonCareerLevelId)
                .NotEmpty()
                .MustAsync(PersonCareerLevelExists).WithMessage("Karriereleveländerung existiert nicht!")
                .MustAsync(CheckPersonCareerLevelChangeInvariants).WithMessage("Kann die Zeit nicht außerhalb der Rahmen verändern!");
        }

        public async Task<bool> PersonCareerLevelExists(AlterPersonCareerLevelStartCommand model, int personCareerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(new object[] {personCareerLevelId}, cancellationToken) != null;
        }

        public async Task<bool> CheckPersonCareerLevelChangeInvariants(AlterPersonCareerLevelStartCommand model, int personCareerLevelId, CancellationToken cancellationToken) {
            var personCareerLevelToChange = await _context.PersonCareerLevels.FindAsync(new object[]{model.PersonCareerLevelId}, cancellationToken);
            var previousCareerLevel = await _context.PersonCareerLevels.Where(pcl => pcl.EndDateTime == personCareerLevelToChange.BeginDateTime).FirstOrDefaultAsync(cancellationToken);
            // we need to make sure the new career level change starts *before* the later one ends
            if (personCareerLevelToChange.EndDateTime != null && model.NewBeginTime >= personCareerLevelToChange.EndDateTime) {
                return false;
            }
            // we need to make sure the new career level change ends *after* the previous one starts
            if (previousCareerLevel != null && model.NewBeginTime <= previousCareerLevel.BeginDateTime) {
                return false;
            }
            return true;
        }
    }
}
