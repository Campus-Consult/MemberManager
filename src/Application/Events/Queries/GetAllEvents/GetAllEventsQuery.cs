using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Events.Common;

namespace MemberManager.Application.Events.Queries.GetAllEvents
{
    public class GetAllEventsQuery : IRequest<List<EventLookupDto>> {}

    public class GetAllEventsQueryHandler : IRequestHandler<GetAllEventsQuery, List<EventLookupDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllEventsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EventLookupDto>> Handle(GetAllEventsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Events.Include(e => e.EventTags).ProjectTo<EventLookupDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
