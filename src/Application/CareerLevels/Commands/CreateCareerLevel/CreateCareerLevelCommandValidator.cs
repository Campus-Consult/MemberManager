using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand
{
    public class CreateCareerLevelCommandValidator : AbstractValidator<CreateCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public CreateCareerLevelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleFor(v => v.Name).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(CareerLevelNameUnique).WithMessage("Name des Karrierelevels wird bereits verwendet!");
            RuleFor(v => v.ShortName).Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(CareerLevelShortNameUnique).WithMessage("Kurzbezeichnung des Karrierelevels wird bereits verwendet!");
        }

        public async Task<bool> CareerLevelNameUnique(CreateCareerLevelCommand model, string name, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.Name != name, cancellationToken);
        }

        public async Task<bool> CareerLevelShortNameUnique(CreateCareerLevelCommand model, string shortName, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.ShortName != shortName, cancellationToken);
        }
    }
}
