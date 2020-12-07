using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.UpdateCareerLevelCommand
{
    public class UpdateCareerLevelCommandValidator : AbstractValidator<UpdateCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public UpdateCareerLevelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleFor(v => v.CareerLevelId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(CareerLevelExists).WithMessage("Career Level doesn't exist!");
            RuleFor(v => v.Name).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(PositioNameUnique).WithMessage("Career Level Name has to be unique!");
            RuleFor(v => v.ShortName).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(PositionShortNameUnique).WithMessage("Career Level short Name has to be unique!");
        }

        public async Task<bool> CareerLevelExists(UpdateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> PositioNameUnique(UpdateCareerLevelCommand model, string name, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.Name != name, cancellationToken);
        }

        public async Task<bool> PositionShortNameUnique(UpdateCareerLevelCommand model, string shortName, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.ShortName != shortName, cancellationToken);
        }
    }
}
