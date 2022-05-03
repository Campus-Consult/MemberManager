using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using FluentValidation.Validators;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.People.Commands.CreatePerson
{
    public class CreatePersonCommandValidator : AbstractValidator<CreatePersonCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreatePersonCommandValidator(IApplicationDbContext context) 
        {
            _context = context;

            RuleFor(v => v.FirstName)
                .MaximumLength(200)
                .NotEmpty();
            RuleFor(v => v.Surname)
                .MaximumLength(200)
                .NotEmpty();
            RuleFor(v => v.Birthdate)
                .NotEmpty();
            RuleFor(v => v.Gender)
                .IsInEnum()
                .NotNull();
            RuleFor(v => v.EmailPrivate)
                .EmailAddress()
                .NotEmpty();
            RuleFor(v => v.EmailAssociaton)
                .EmailAddress()
                .NotEmpty()
                .MustAsync(EmailDoesntAlreadyExist).WithMessage("Die E-Mail Addresse existiert bereits!");
            RuleFor(v => v.MobilePrivate)
                .SetValidator(new RegularExpressionValidator<CreatePersonCommand>(@"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"));
            RuleFor(v => v.AdressStreet)
                .MaximumLength(200);
            RuleFor(v => v.AdressNo)
                .MaximumLength(200);
            RuleFor(v => v.AdressZIP)
                .MaximumLength(200);
            RuleFor(v => v.AdressCity)
                .MaximumLength(200);
        }

        public async Task<bool> EmailDoesntAlreadyExist(string email, CancellationToken token) {
            return !await _context.People.AnyAsync(p => p.EmailAssociaton == email);
        }
    }
}
