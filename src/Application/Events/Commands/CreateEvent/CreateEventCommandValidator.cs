using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.CreateEvent
{
    public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateEventCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.Start)
                .NotEmpty()
                .Must(StartBeforeEnd).WithMessage("Start has to be before End");

            RuleFor(v => v.OrganizerEmail)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Organizer does not exist.");
        }

        public bool StartBeforeEnd(CreateEventCommand model, DateTime start) {
            return model.Start < model.End;
        }

        public async Task<bool> PersonExists(CreateEventCommand command, string email, CancellationToken token) {
            return await _context.People.Where(p => p.EmailAssociaton == email).AnyAsync(token);
        }
    }
}
