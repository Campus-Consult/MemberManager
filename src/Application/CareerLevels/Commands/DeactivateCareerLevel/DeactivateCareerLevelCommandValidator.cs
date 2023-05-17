using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.DeactivateCareerLevel
{
    public class DeactivateCareerLevelCommandValidator : AbstractValidator<DeactivateCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public DeactivateCareerLevelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.CareerLevelId)
                .NotEmpty()
                .MustAsync(CareerLevelExists).WithMessage("Karrierelevel existiert nicht!")
                .MustAsync(CareerLevelActive).WithMessage("Das Karrierelevel ist nicht aktiv!");
            
            RuleFor(v => v.NewCareerLevelId)
                .NotEmpty()
                .Must(NewCareerLevelDifferent).WithMessage("Neues Karrierelevel das Gleiche wie das Alte!")
                .MustAsync(CareerLevelExists).WithMessage("Neues Karrierelevel existiert nicht!");
        }

        public async Task<bool> CareerLevelExists(DeactivateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> CareerLevelActive(DeactivateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return (await _context.CareerLevels.FindAsync(careerLevelId)).IsActive;
        }

        public bool NewCareerLevelDifferent(DeactivateCareerLevelCommand model, int newCareerLevelId) {
            return model.CareerLevelId != newCareerLevelId;
        }
    }
}
