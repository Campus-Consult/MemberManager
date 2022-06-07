using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.DeleteEvent
{
    public class DeleteEventCommandValidator : AbstractValidator<DeleteEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteEventCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(EventExists).WithMessage("Event does not exist.");
        }

        public async Task<bool> EventExists(DeleteEventCommand model, int eventId, CancellationToken cancellationToken) {
            return await _context.Events.FindAsync(new object [] {eventId}, cancellationToken) != null;
        }
    }
}
