using MediatR;
using MemberManager.Application.CareerLevels.Commands.ChangePersonCareerLevel;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CareerLevels.Commands.DeactivateCareerLevel
{
    public class DeactivateCareerLevelCommand : IRequest
    {
        public int CareerLevelId { get; set; }
        
        public int NewCareerLevelId { get; set; }
        public DateTime ChangeDateTime { get; set; }
    }

    public class DeactivateCareerLevelCommandHandler : IRequestHandler<DeactivateCareerLevelCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public DeactivateCareerLevelCommandHandler(IApplicationDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DeactivateCareerLevelCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.CareerLevels.Include(c => c.PersonCareerLevels).FirstAsync(c => c.Id == request.CareerLevelId);

            entity.IsActive = false;

            // iterate over all person career levels that are active at that point
            foreach (var personCareerLevel in entity.PersonCareerLevels.Where(pcl => pcl.IncludesTime(request.ChangeDateTime))) {
                await _mediator.Send(new ChangePersonCareerLevelCommand {
                    CareerLevelId = request.NewCareerLevelId,
                    ChangeDateTime = request.ChangeDateTime,
                    PersonId = personCareerLevel.PersonId,
                });
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
