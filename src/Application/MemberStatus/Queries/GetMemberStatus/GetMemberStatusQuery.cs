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
        private readonly IDateTime _dateTime;

        public GetMemberStatusQueryHandler(IApplicationDbContext context, IMapper mapper, IDateTime dateTime)
        {
            _context = context;
            _mapper = mapper;
            _dateTime = dateTime;
        }
        public async Task<MemberStatusVm> Handle(GetMemberStatusQuery request, CancellationToken cancellationToken)
        {
            return new MemberStatusVm
            {
                MemberStatus = await _context.MemberStatus
                    .Include(ms => ms.PersonMemberStatus)
                    .ProjectTo<MemberStatusLookupDto>(_mapper.ConfigurationProvider, new { dateTimeNow = _dateTime.Now })
                    .OrderBy(p => p.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
