using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.AddEventAnswer
{
    public class AddEventAnswerCommandValidator : AbstractValidator<AddEventAnswerCommand>
    {
        private readonly IApplicationDbContext _context;

        public AddEventAnswerCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.AnswerTime)
                .NotEmpty();
            
            RuleFor(v => v.EventId)
                .NotEmpty()
                .MustAsync(EventMustExist).WithMessage("Event not found");

            RuleFor(v => v.PersonId)
                .NotEmpty()
                .MustAsync(PersonMustExist).WithMessage("Person not found")
                .MustAsync(PersonMustNotAttendAlready).WithMessage("Person already answered for this Event");
        }

        public async Task<bool> EventMustExist(AddEventAnswerCommand command, int eventId, CancellationToken cancellationToken) {
            return (await _context.Events.FindAsync(new object [] {eventId}, cancellationToken)) != null;
        }

        public async Task<bool> PersonMustExist(AddEventAnswerCommand command, int personId, CancellationToken cancellationToken) {
            return (await _context.People.FindAsync(new object [] {personId}, cancellationToken)) != null;
        }

        public async Task<bool> PersonMustNotAttendAlready(AddEventAnswerCommand command, int personId, CancellationToken cancellationToken) {
            return !(await _context.EventAnswers.Where(a => a.PersonId == command.PersonId && a.EventId == command.EventId).AnyAsync(cancellationToken));
        }
    }
}
