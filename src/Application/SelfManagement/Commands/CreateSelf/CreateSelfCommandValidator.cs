using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using FluentValidation.Validators;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.SelfManagement.Commands.CreateSelf
{
    public class CreateSelfCommandValidator : AbstractValidator<CreateSelfCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreateSelfCommandValidator(IApplicationDbContext context) 
        {
            _context = context;

            RuleFor(c => c.Email)
                .NotEmpty()
                .Equal(c => c.CreateCommand.EmailAssociaton).WithMessage("Falsche EmailAssoction!")
                .MustAsync(PersonDoesntExist).WithMessage("Person already exist!");
        }

        public async Task<bool> PersonDoesntExist(CreateSelfCommand command, string email, CancellationToken token) {
            var foundPerson = await _context.People.Where(p => p.EmailAssociaton == email).FirstOrDefaultAsync();
            return foundPerson == null;
        }
    }
}
