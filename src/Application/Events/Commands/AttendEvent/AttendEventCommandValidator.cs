using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.AttendEvent
{
    public class CreateEventCommandValidator : AbstractValidator<AttendEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateEventCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.EventId)
                .NotEmpty();

            RuleFor(v => v.EventSecretKey)
                .NotEmpty()
                .MustAsync(SecretKeyCheck).WithMessage("Event not found or bad key");
        }

        // for security we check both if the event exists and if the key matches, to give the same error in both cases
        public async Task<bool> SecretKeyCheck(AttendEventCommand command, string secretKey, CancellationToken cancellationToken) {
            return (await _context.Events.FindAsync(new object [] {command.EventId}, cancellationToken))?.SecretKey == secretKey;
        }
    }
}
