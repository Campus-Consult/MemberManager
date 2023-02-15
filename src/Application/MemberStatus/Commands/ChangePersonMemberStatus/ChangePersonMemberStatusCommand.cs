using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.ChangePersonMemberStatus
{
    public class ChangePersonMemberStatusCommand : IRequest<int>
    {
        public int MemberStatusId { get; set; }
        public int PersonId { get; set; }
        public DateTime ChangeDateTime { get; set; }
    }

    public class ChangePersonMemberStatusCommandHandler : IRequestHandler<ChangePersonMemberStatusCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public ChangePersonMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<int> Handle(ChangePersonMemberStatusCommand request, CancellationToken cancellationToken)
        {
            return changePersonMemberStatus(request, cancellationToken, _context);
        }

        public static async Task<int> changePersonMemberStatus(ChangePersonMemberStatusCommand request, CancellationToken cancellationToken, IApplicationDbContext context) {
            // get PersonMemberStatus directly before the changeTime
            var previousPersonMemberStatus = context.PersonMemberStatus
                // has to start before the memberStatus change
                .Where(p => p.PersonId == request.PersonId && p.BeginDateTime < request.ChangeDateTime)
                .AsEnumerable()
                // has to be the member status change
                // it doesn't matter if BeginDateTime or EndDateTimes are compared, because their ordering will always be the same
                .MaxBy(p => p.BeginDateTime);

            var nextPersonMemberStatus = context.PersonMemberStatus
                // has to start after the member status change
                .Where(p => p.PersonId == request.PersonId && p.BeginDateTime > request.ChangeDateTime)
                .AsEnumerable()
                // has to be the earliest career level change
                .MinBy(p => p.BeginDateTime);
            

            // if there was a previous career level, set the end to the start of the new career level
            if (previousPersonMemberStatus != null) {
                previousPersonMemberStatus.EndDateTime = request.ChangeDateTime;
            }

            // if the next career level is the same as the one the person is assigned here to, update
            // it to start at the requested change time
            if (nextPersonMemberStatus?.MemberStatusId == request.MemberStatusId) {
                nextPersonMemberStatus.BeginDateTime = request.ChangeDateTime;
                await context.SaveChangesAsync(cancellationToken);
                return nextPersonMemberStatus.Id;
            } else {
                // if there is a next career level, end the new career level there
                var newEndDateTime = nextPersonMemberStatus?.BeginDateTime;
                var newPersonCareerLevel = new PersonMemberStatus {
                    MemberStatusId = request.MemberStatusId,
                    PersonId = request.PersonId,
                    BeginDateTime = request.ChangeDateTime,
                    EndDateTime = newEndDateTime,
                };

                context.PersonMemberStatus.Add(newPersonCareerLevel);

                await context.SaveChangesAsync(cancellationToken);

                return newPersonCareerLevel.Id;
            }
        }
    }
}
