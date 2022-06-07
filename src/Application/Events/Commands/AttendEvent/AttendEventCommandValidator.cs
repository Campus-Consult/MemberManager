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
        private readonly IDateTime _dateTime;

        public CreateEventCommandValidator(IApplicationDbContext context, IDateTime dateTime)
        {
            _context = context;
            _dateTime = dateTime;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.EventId)
                .NotEmpty();

            RuleFor(v => v.EventSecretKey)
                .NotEmpty()
                .MustAsync(SecretKeyCheck).WithMessage("Event not found or bad key")
                .MustAsync(CheckEventActive).WithMessage("Event is not active!");
        }

        // for security we check both if the event exists and if the key matches, to give the same error in both cases
        public async Task<bool> SecretKeyCheck(AttendEventCommand command, string secretKey, CancellationToken cancellationToken) {
            return (await _context.Events.FindAsync(new object [] {command.EventId}, cancellationToken))?.SecretKey == secretKey;
        }

        public async Task<bool> CheckEventActive(AttendEventCommand command, string secretKey, CancellationToken cancellationToken) {
            var evnt = await _context.Events.FindAsync(new object [] {command.EventId}, cancellationToken);
            var now = _dateTime.Now;
            return evnt.Start < now && evnt.End > now;
        }
    }
}
