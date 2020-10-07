using FluentValidation;
using FluentValidation.Validators;

namespace MemberManager.Application.People.Commands.CreatePerson
{
    public class CreatePersonCommandValidator : AbstractValidator<CreatePersonCommand>
    {
        public CreatePersonCommandValidator()
        {
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
                .NotEmpty();
            RuleFor(v => v.EmailPrivate)
                .EmailAddress()
                .NotEmpty();
            RuleFor(v => v.EmailAssociaton)
                .EmailAddress()
                .NotEmpty();
            RuleFor(v => v.MobilePrivate)
                .SetValidator(new RegularExpressionValidator(@"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"));
            RuleFor(v => v.AdressStreet)
                .MaximumLength(200);
            RuleFor(v => v.AdressNo)
                .MaximumLength(200);
            RuleFor(v => v.AdressZIP)
                .MaximumLength(200);
            RuleFor(v => v.AdressCity)
                .MaximumLength(200);
        }
    }
}
