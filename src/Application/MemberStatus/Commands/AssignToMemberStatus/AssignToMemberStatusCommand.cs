using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.AssignToMemberStatus
{
    public class AssignToMemberStatusCommand : IRequest<int>
    {
        public int MemberStatusId { get; set; }
        public int PersonId { get; set; }
        public DateTime AssignmentDateTime { get; set; }
        public DateTime? DismissDateTime { get; set; }
    }

    public class AssignToMemberStatusCommandHandler : IRequestHandler<AssignToMemberStatusCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public AssignToMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AssignToMemberStatusCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus.FindAsync(request.MemberStatusId);

            if(entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus));
            }

            var newPersonMemberStatus = new PersonMemberStatus()
            {
                MemberStatusId = request.MemberStatusId,
                PersonId = request.PersonId,
                BeginDateTime = request.AssignmentDateTime,
                EndDateTime = request.DismissDateTime,
            };

            entity.PersonMemberStatus.Add(newPersonMemberStatus);

            await _context.SaveChangesAsync(cancellationToken);

            return newPersonMemberStatus.Id;
        }
    }
}
