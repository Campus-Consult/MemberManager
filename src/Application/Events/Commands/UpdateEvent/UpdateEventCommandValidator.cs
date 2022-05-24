using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.UpdateEvent
{
    public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateEventCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.Start)
                .NotEmpty()
                .Must(StartBeforeEnd).WithMessage("Start has to be before End");

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(EventExists).WithMessage("Event does not exist.");
        }

        public bool StartBeforeEnd(UpdateEventCommand model, DateTime start) {
            return model.Start < model.End;
        }

        public async Task<bool> EventExists(UpdateEventCommand model, int eventId, CancellationToken cancellationToken) {
            return await _context.Events.FindAsync(new object[] {eventId}, cancellationToken) != null;
        }
    }
}
