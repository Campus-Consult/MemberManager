using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.UpdatePersonPosition
{
    public class UpdatePersonPositionCommandValidator : AbstractValidator<UpdatePersonPositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePersonPositionCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.PersonPositionId)
                .NotEmpty()
                .MustAsync(PersonPositionExists).WithMessage("Personen Positions Zuordnung existiert nicht.")
                .MustAsync(PersonIsNotAssignedAlready).WithMessage("Person ist zu diesem Zeitpunkt bereits dem Posten zugewiesen!");
            
            RuleFor(v => v.AssignmentDateTime)
                .NotEmpty()
                .Must(AssignmentDateTimeIsBeforeEndDateTime).WithMessage("Anfangszeit muss vor Endzeit sein.");
        }

        public async Task<bool> PersonPositionExists(int personPositionId, CancellationToken cancellationToken) {
            return await _context.PersonPositions.FindAsync(personPositionId) != null;
        }

        public async Task<bool> PersonIsNotAssignedAlready(UpdatePersonPositionCommand model, int personPositionId, CancellationToken cancellationToken)
        {
            var personPosition = await _context.PersonPositions.FindAsync(personPositionId);
            return await _context.PersonPositions
                .Where(pp => pp.PersonId == personPosition.PersonId && pp.PositionId == personPosition.PositionId)
                // all person positions have to either: start and finish before the new one or start (and finish) after this one
                .AllAsync(pp => (pp.EndDateTime < model.AssignmentDateTime) || (model.DismissalDateTime != null && (pp.BeginDateTime > model.DismissalDateTime)), cancellationToken);
        }

        public bool AssignmentDateTimeIsBeforeEndDateTime(UpdatePersonPositionCommand command, DateTime assignmentDateTime) {
            return command.DismissalDateTime == null || assignmentDateTime < command.DismissalDateTime;
        }
    }
}
