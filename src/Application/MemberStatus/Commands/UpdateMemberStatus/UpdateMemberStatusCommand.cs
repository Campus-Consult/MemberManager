using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatuss.Commands.UpdateMemberStatus
{
    public class UpdateMemberStatusCommand : IRequest
    {
        public int MemberStatusId { get; set; }
        public string Name { get; set; }
    }

    public class UpdateMemberStatusCommandHandler : IRequestHandler<UpdateMemberStatusCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateMemberStatusCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus.FindAsync(request.MemberStatusId);

            entity.Name = request.Name;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
