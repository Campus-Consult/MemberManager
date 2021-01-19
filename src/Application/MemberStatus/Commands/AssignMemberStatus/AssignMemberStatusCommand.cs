using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Commands.AssignMemberStatus
{
    public class AssignMemberStatusCommand : IRequest
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DateTime AssignmentDateTime { get; set; }
    }

    public class AssignMemberStatusCommandHandler : IRequestHandler<AssignMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public AssignMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(AssignMemberStatusCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus.FindAsync(request.Id);

            if(entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus));
            }

            entity.PersonMemberStatus.Add(
                new PersonMemberStatus()
                {
                    MemberStatusId = request.Id,
                    PersonId = request.PersonId,
                    BeginDateTime = request.AssignmentDateTime,
                }
            );

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
