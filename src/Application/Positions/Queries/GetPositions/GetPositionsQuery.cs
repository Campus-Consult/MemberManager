using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Queries.GetPositions
{
    public class GetPositionsQuery : IRequest<PositionsVm>
    {
    }

    public class GetPeopleQueryHandler : IRequestHandler<GetPositionsQuery, PositionsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPeopleQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PositionsVm> Handle(GetPositionsQuery request, CancellationToken cancellationToken)
        {
            return new PositionsVm
            {
                Positions = await _context.Positions
                    .ProjectTo<PositionLookupDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
