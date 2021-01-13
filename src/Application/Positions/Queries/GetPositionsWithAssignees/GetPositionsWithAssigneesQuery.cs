using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Queries.GetPositionsWithAssignees
{
    public class GetPositionsWithAssigneesQuery : IRequest<PositionsWAVm>
    {
        public bool IncludeHistory { get; set; }
    }

    public class GetPositionsWithAssigneesQueryHandler : IRequestHandler<GetPositionsWithAssigneesQuery, PositionsWAVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPositionsWithAssigneesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PositionsWAVm> Handle(GetPositionsWithAssigneesQuery request, CancellationToken cancellationToken)
        {
            var positions = await _context.Positions
                .AsNoTracking()
                .Include(p => p.PersonPositions)
                .ThenInclude(pp => pp.Person)
                .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                .OrderBy(p => p.Name)
                .ToListAsync(cancellationToken);
            
            if (!request.IncludeHistory) {
                foreach (var position in positions) {
                    // this is kinda bad, but filtering on includes doesn't seem to be supported yet
                    position.Assignees = position.Assignees.Where(a => a.EndDateTime == null).ToList();
                }
            }
            return new PositionsWAVm
            {
                Positions = positions,
            };
        }
    }
}
