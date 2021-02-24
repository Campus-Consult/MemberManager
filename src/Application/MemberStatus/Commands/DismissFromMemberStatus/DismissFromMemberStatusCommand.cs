using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.DismissFromMemberStatus
{
    public class DismissFromMemberStatusCommand : IRequest
    {
        public int MemberStatusId { get; set; }
        public int PersonId { get; set; }
        public DateTime DismissalDateTime { get; set; }
    }

    public class DismissFromMemberStatusCommandHandler : IRequestHandler<DismissFromMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public DismissFromMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DismissFromMemberStatusCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PersonMemberStatus.FirstAsync(pms => pms.MemberStatusId == request.MemberStatusId 
                && pms.PersonId == request.PersonId 
                && pms.EndDateTime == null);

            if (entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus));
            }

            entity.EndDateTime = request.DismissalDateTime;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
