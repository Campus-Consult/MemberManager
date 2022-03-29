using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using FluentValidation.Validators;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.People.Commands.CreatePersonWithLevelStatus
{
    public class CreatePersonWithLevelStatusCommandValidator : AbstractValidator<CreatePersonWithLevelStatusCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreatePersonWithLevelStatusCommandValidator(IApplicationDbContext context) 
        {
            _context = context;

            RuleFor(v => v.InitialCareerLevelId)
                .NotNull()
                .MustAsync(CareerLevelExists).WithMessage("Diese Karrierestufe existiert nicht!");
            RuleFor(v => v.InitialMemberStatusId)
                .NotNull()
                .MustAsync(MemberStatusExists).WithMessage("Dieser Status existiert nicht!");
        }

        public async Task<bool> CareerLevelExists(int careerLevelId, CancellationToken token) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> MemberStatusExists(int memberStatusId, CancellationToken token) {
            return await _context.MemberStatus.FindAsync(memberStatusId) != null;
        }
    }
}
