using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.CreatePosition
{
    public class CreatePositionCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
    }

    public class CreatePositionCommandHandler : IRequestHandler<CreatePositionCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreatePositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreatePositionCommand request, CancellationToken cancellationToken)
        {
            var entity = new Position
            {
                Name = request.Name,
                ShortName = request.ShortName,
                IsActive = true,
            };

            _context.Positions.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
