using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatuss.Commands.CreateMemberStatus
{
    public class CreateMemberStatusCommand : IRequest<int>
    {
        public string Name { get; set; }
    }

    public class CreateMemberStatusCommandHandler : IRequestHandler<CreateMemberStatusCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateMemberStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateMemberStatusCommand request, CancellationToken cancellationToken)
        {
            var entity = new MemberStatus {
                Name = request.Name,
            };

            _context.MemberStatus.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
