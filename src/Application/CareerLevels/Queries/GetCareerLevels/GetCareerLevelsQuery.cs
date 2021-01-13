using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevels
{
    public class GetCareerLevelsQuery : IRequest<CareerLevelsVm>
    {
    }

    public class GetCareerLevelsQueryHandler : IRequestHandler<GetCareerLevelsQuery, CareerLevelsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCareerLevelsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CareerLevelsVm> Handle(GetCareerLevelsQuery request, CancellationToken cancellationToken)
        {
            return new CareerLevelsVm
            {
                CareerLevels = await _context.CareerLevels
                    .OrderBy(c => c.Name)
                    .ProjectTo<CareerLevelLookupDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
