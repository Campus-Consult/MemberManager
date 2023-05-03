using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.AlterPersonCareerLevelStart
{
    public class AlterPersonCareerLevelStartCommand : IRequest
    {
        public int PersonCareerLevelId { get; set; }
        public DateTime NewBeginTime { get; set; }
    }

    public class AlterPersonCareerLevelStartCommandHandler : IRequestHandler<AlterPersonCareerLevelStartCommand>
    {
        private readonly IApplicationDbContext _context;

        public AlterPersonCareerLevelStartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(AlterPersonCareerLevelStartCommand request, CancellationToken cancellationToken)
        {
            var personCareerLevelToChange = await _context.PersonCareerLevels.FindAsync(new object[]{request.PersonCareerLevelId}, cancellationToken);
            var previousCareerLevel = await _context.PersonCareerLevels.Where(pcl => pcl.EndDateTime == personCareerLevelToChange.BeginDateTime).FirstOrDefaultAsync(cancellationToken);
            // time was checked before
            personCareerLevelToChange.BeginDateTime = request.NewBeginTime;
            if (previousCareerLevel != null) {
                previousCareerLevel.EndDateTime = request.NewBeginTime;
            }
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
