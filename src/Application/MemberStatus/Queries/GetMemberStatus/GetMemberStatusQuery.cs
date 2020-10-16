using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatus
{
    public class GetMemberStatusQuery : IRequest<MemberStatusVm>
    {
    }

    public class GetMemberStatusQueryHandler : IRequestHandler<GetMemberStatusQuery, MemberStatusVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMemberStatusQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<MemberStatusVm> Handle(GetMemberStatusQuery request, CancellationToken cancellationToken)
        {
            return new MemberStatusVm
            {
                MemberStatus = await _context.MemberStatus
                    .Include(ms => ms.PersonMemberStatus)
                    .ProjectTo<MemberStatusLookupDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
