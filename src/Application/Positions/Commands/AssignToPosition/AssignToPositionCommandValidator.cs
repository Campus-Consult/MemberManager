using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.AssignToPosition
{
    public class AssignToPositionCommandValidator : AbstractValidator<AssignToPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignToPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.PersonId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person existiert nicht.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person ist zu diesem Zeitpunkt bereits dem Posten zugewiesen!");
            
            RuleFor(v => v.PositionId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Posten existiert nicht.");

            RuleFor(v => v.AssignmentDateTime).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(AssignmentDateTimeIsBeforeEndDateTime).WithMessage("Anfangszeit muss vor Endzeit sein.");
        }

        public async Task<bool> PositionExists(AssignToPositionCommand command1, int positionId, CancellationToken cancellationToken) {
            return await _context.Positions.FindAsync(positionId) != null;
        }

        public async Task<bool> PersonExists(AssignToPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> PersonIsNotAssignedAlready(AssignToPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.PersonPositions
                .Where(pp => pp.PersonId == personId && pp.PositionId == model.PositionId)
                // all person positions have to either: start and finish before the new one or start (and finish) after this one
                .AllAsync(pp => (pp.EndDateTime < model.AssignmentDateTime) || (model.DismissalDateTime != null && (pp.BeginDateTime > model.DismissalDateTime)), cancellationToken);
                // .AnyAsync(pp => pp.BeginDateTime <= model.AssignmentDateTime && (pp.EndDateTime == null || pp.EndDateTime >= model.AssignmentDateTime));
        }

        public bool AssignmentDateTimeIsBeforeEndDateTime(AssignToPositionCommand command, DateTime assignmentDateTime) {
            return command.DismissalDateTime == null || assignmentDateTime < command.DismissalDateTime;
        }
    }
}
