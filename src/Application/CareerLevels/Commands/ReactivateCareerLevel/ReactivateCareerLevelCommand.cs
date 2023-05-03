using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CareerLevels.Commands.ReactivateCareerLevel
{
    public class ReactivateCareerLevelCommand : IRequest
    {
        public int CareerLevelId { get; set; }
    }

    public class ReactivateCareerLevelCommandHandler : IRequestHandler<ReactivateCareerLevelCommand>
    {
        private readonly IApplicationDbContext _context;

        public ReactivateCareerLevelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(ReactivateCareerLevelCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.CareerLevels.FindAsync(request.CareerLevelId);

            entity.IsActive = true;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
