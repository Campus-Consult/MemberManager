using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.ReactivateCareerLevel
{
    public class ReactivateCareerLevelCommandHandlerValidator : AbstractValidator<ReactivateCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public ReactivateCareerLevelCommandHandlerValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.CareerLevelId)
                .NotEmpty()
                .MustAsync(CareerLevelExists).WithMessage("Karrierelevel existiert nicht!")
                .MustAsync(CareerLevelNotActive).WithMessage("Das Karrierelevel ist aktiv!");
        }

        public async Task<bool> CareerLevelExists(ReactivateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> CareerLevelNotActive(ReactivateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return !(await _context.CareerLevels.FindAsync(careerLevelId)).IsActive;
        }
    }
}
