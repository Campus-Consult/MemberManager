using FluentValidation;

namespace MemberManager.Application.Positions.Commands.CreatePosition
{
    public class CreatePositionCommandValidator : AbstractValidator<CreatePositionCommand>
    {
        public CreatePositionCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200)
                .NotEmpty();
            RuleFor(v => v.ShortName)
                .MaximumLength(200)
                .NotEmpty();
        }
    }
}
