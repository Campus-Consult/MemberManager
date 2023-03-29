using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.RemoveEventAnswer
{
    public class RemoveEventAnswerCommandValidator : AbstractValidator<RemoveEventAnswerCommand>
    {
        private readonly IApplicationDbContext _context;

        public RemoveEventAnswerCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(v => v.Id)
                .NotEmpty()
                .MustAsync(EventAnswerExists).WithMessage("Event Answer does not exist.");
        }

        public async Task<bool> EventAnswerExists(RemoveEventAnswerCommand model, int eventAnswerId, CancellationToken cancellationToken) {
            return await _context.EventAnswers.FindAsync(new object [] {eventAnswerId}, cancellationToken) != null;
        }
    }
}
