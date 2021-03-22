using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand
{
    public class CreateCareerLevelCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
    }

    public class CreateCareerLevelCommandHandler : IRequestHandler<CreateCareerLevelCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateCareerLevelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCareerLevelCommand request, CancellationToken cancellationToken)
        {
            var entity = new CareerLevel {
                IsActive = true,
                Name = request.Name,
                ShortName = request.ShortName,
            };

            _context.CareerLevels.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
