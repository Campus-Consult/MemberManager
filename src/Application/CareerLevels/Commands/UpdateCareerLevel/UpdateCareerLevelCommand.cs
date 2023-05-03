using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CareerLevels.Commands.UpdateCareerLevelCommand
{
    public class UpdateCareerLevelCommand : IRequest
    {
        public int CareerLevelId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
    }

    public class UpdateCareerLevelCommandHandler : IRequestHandler<UpdateCareerLevelCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateCareerLevelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateCareerLevelCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.CareerLevels.FindAsync(request.CareerLevelId);

            entity.Name = request.Name;
            entity.ShortName = request.ShortName;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
