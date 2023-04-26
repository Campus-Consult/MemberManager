using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.MemberStatuss.Commands.RemovePersonMemberStatusChange
{
    public class RemovePersonMemberStatusChangeCommand : IRequest
    {
        public int PersonMemberStatusId { get; set; }
    }

    public class RemovePersonMemberStatusChangeCommandHandler : IRequestHandler<RemovePersonMemberStatusChangeCommand>
    {
        private readonly IApplicationDbContext _context;

        public RemovePersonMemberStatusChangeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(RemovePersonMemberStatusChangeCommand request, CancellationToken cancellationToken)
        {
            PersonMemberStatus persStatusToDelete = await _context.PersonMemberStatus.FindAsync(new object[] {request.PersonMemberStatusId}, cancellationToken);
            var previousPersStatus = _context.PersonMemberStatus
                // has to start before the member status that is deleted
                .Where(p => p.PersonId == persStatusToDelete.PersonId && p.BeginDateTime < persStatusToDelete.BeginDateTime)
                // it doesn't matter if BeginDateTime or EndDateTimes are compared, because their ordering will always be the same
                .MaxBy(p => p.BeginDateTime);

            // can only be null if it's the first one
            if (previousPersStatus != null) {
                // fill the now empty slot with the previous career level, if it exists
                previousPersStatus.EndDateTime = persStatusToDelete.EndDateTime;
            }

            _context.PersonMemberStatus.Remove(persStatusToDelete);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
