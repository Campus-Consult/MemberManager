using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.Positions.Commands.CreatePosition
{
    public class CreatePositionCommandValidator : AbstractValidator<CreatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreatePositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Name)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(PositionNameIsUnique).WithMessage("Positionsname existiert bereits.");
            RuleFor(v => v.ShortName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MaximumLength(20)
                .NotEmpty()
                .MustAsync(PositionShortNameIsUnique).WithMessage("Positions Kurzbezeichnung existiert bereits.");
        }

        public async Task<bool> PositionNameIsUnique(CreatePositionCommand command, string personName, CancellationToken cancellationToken)
        {
            return await _context.Positions.AllAsync(p => p.Name != personName);
        }

        public async Task<bool> PositionShortNameIsUnique(CreatePositionCommand command, string shortName, CancellationToken cancellationToken)
        {
            return await _context.Positions.AllAsync(p => p.ShortName != shortName);
        }
    }
}
