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
            return new PositionsWAVm
            {
                Positions = await _context.Positions
                    .Include(p => p.PersonPositions).ThenInclude(pp => pp.Person)
                    .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
