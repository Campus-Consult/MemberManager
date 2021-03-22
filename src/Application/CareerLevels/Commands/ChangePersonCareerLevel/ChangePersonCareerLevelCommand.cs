using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.ChangePersonCareerLevel
{
    public class ChangePersonCareerLevelCommand : IRequest<int>
    {
        public int CareerLevelId { get; set; }
        public int PersonId { get; set; }
        public DateTime ChangeDateTime { get; set; }
    }

    public class ChangePersonCareerLevelCommandHandler : IRequestHandler<ChangePersonCareerLevelCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public ChangePersonCareerLevelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<int> Handle(ChangePersonCareerLevelCommand request, CancellationToken cancellationToken)
        {
            return changePersonCareerLevel(request, cancellationToken, _context);
        }

        public static async Task<int> changePersonCareerLevel(ChangePersonCareerLevelCommand request, CancellationToken cancellationToken, IApplicationDbContext context) {
            // get PersonCareerLevel directly before the changeTime
            var previousPersonCareerLevel = context.PersonCareerLevels
                // has to start before the careerlevel change
                .Where(p => p.PersonId == request.PersonId && p.BeginDateTime < request.ChangeDateTime)
                .ToList()
                .DefaultIfEmpty()
                // has to be the career level change
                // it doesn't matter if BeginDateTime or EndDateTimes are compared, because their ordering will always be the same
                .Aggregate((latest,p) => p.BeginDateTime > latest.BeginDateTime ? p : latest);

            var nextPersonCareerLevel = context.PersonCareerLevels
                // has to start after the career level change
                .Where(p => p.PersonId == request.PersonId && p.BeginDateTime > request.ChangeDateTime)
                .ToList()
                .DefaultIfEmpty()
                // has to be the earliest career level change
                .Aggregate((earliest,p) => p.BeginDateTime < earliest.BeginDateTime ? p : earliest);
            

            // if there was a previous career level, set the end to the start of the new career level
            if (previousPersonCareerLevel != null) {
                previousPersonCareerLevel.EndDateTime = request.ChangeDateTime;
            }

            // if the next career level is the same as the one the person is assigned here to, update
            // it to start at the requested change time
            if (nextPersonCareerLevel?.CareerLevelId == request.CareerLevelId) {
                nextPersonCareerLevel.BeginDateTime = request.ChangeDateTime;
                await context.SaveChangesAsync(cancellationToken);
                return nextPersonCareerLevel.Id;
            } else {
                // if there is a next career level, end the new career level there
                var newEndDateTime = nextPersonCareerLevel?.BeginDateTime;
                var newPersonCareerLevel = new PersonCareerLevel {
                    CareerLevelId = request.CareerLevelId,
                    PersonId = request.PersonId,
                    BeginDateTime = request.ChangeDateTime,
                    EndDateTime = newEndDateTime,
                };

                context.PersonCareerLevels.Add(newPersonCareerLevel);

                await context.SaveChangesAsync(cancellationToken);

                return newPersonCareerLevel.Id;
            }
        }
    }
}
