using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.RemovePersonCareerLevelChange
{
    public class RemovePersonCareerLevelChangeCommand : IRequest
    {
        public int PersonCareerLevelId { get; set; }
    }

    public class RemovePersonCareerLevelChangeCommandHandler : IRequestHandler<RemovePersonCareerLevelChangeCommand>
    {
        private readonly IApplicationDbContext _context;

        public RemovePersonCareerLevelChangeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RemovePersonCareerLevelChangeCommand request, CancellationToken cancellationToken)
        {
            PersonCareerLevel persCarLevToDelete = await _context.PersonCareerLevels.FindAsync(request.PersonCareerLevelId);
            var previousPersonCareerLevel = _context.PersonCareerLevels
                // has to start before the careerlevel that is deleted
                .Where(p => p.PersonId == persCarLevToDelete.PersonId && p.BeginDateTime < persCarLevToDelete.BeginDateTime)
                .ToList()
                .DefaultIfEmpty()
                // it doesn't matter if BeginDateTime or EndDateTimes are compared, because their ordering will always be the same
                .Aggregate((latest,p) => p.BeginDateTime > latest.BeginDateTime ? p : latest);

            // can only be null if it's the first one
            if (previousPersonCareerLevel != null) {
                // fill the now empty slot with the previous career level, if it exists
                previousPersonCareerLevel.EndDateTime = persCarLevToDelete.EndDateTime;
            }

            _context.PersonCareerLevels.Remove(persCarLevToDelete);

            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}
