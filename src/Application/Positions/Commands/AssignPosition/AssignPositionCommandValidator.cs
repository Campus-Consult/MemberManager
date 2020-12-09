using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.AssignPosition
{
    public class AssignPositionCommandValidator : AbstractValidator<AssignPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.PersonId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PersonExists).WithMessage("Person does not exist.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person is already assigned to that Position at that Time");
            
            RuleFor(v => v.PositionId).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .MustAsync(PositionExists).WithMessage("Position does not exist.");

            RuleFor(v => v.AssignmentDateTime).Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .Must(AssignmentDateTimeIsBeforeEndDateTime).WithMessage("Assignment has to be before Dismiss.");
        }

        public async Task<bool> PositionExists(AssignPositionCommand command1, int positionId, CancellationToken cancellationToken) {
            return await _context.Positions.FindAsync(positionId) != null;
        }

        public async Task<bool> PersonExists(AssignPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.People.FindAsync(personId) != null;
        }

        public async Task<bool> PersonIsNotAssignedAlready(AssignPositionCommand model, int personId, CancellationToken cancellationToken)
        {
            return await _context.PersonPositions
                .Where(pp => pp.PersonId == personId && pp.PositionId == model.PositionId)
                // all person positions have to either: start and finish before the new one or start (and finish) after this one
                .AllAsync(pp => (pp.EndDateTime < model.AssignmentDateTime) || (model.DismissDateTime != null && (pp.BeginDateTime > model.DismissDateTime)), cancellationToken);
                // .AnyAsync(pp => pp.BeginDateTime <= model.AssignmentDateTime && (pp.EndDateTime == null || pp.EndDateTime >= model.AssignmentDateTime));
        }

        public bool AssignmentDateTimeIsBeforeEndDateTime(AssignPositionCommand command, DateTime assignmentDateTime) {
            return command.DismissDateTime == null || assignmentDateTime < command.DismissDateTime;
        }
    }
}
