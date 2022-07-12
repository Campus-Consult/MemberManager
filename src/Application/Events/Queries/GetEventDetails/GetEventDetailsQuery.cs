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

namespace MemberManager.Application.Events.Queries.GetEventDetails
{
    public class GetEventDetailsQuery : IRequest<EventDetailDto>
    {
        public int EventId { get; set; }
    }

    public class GetEventDetailsQueryHandler : IRequestHandler<GetEventDetailsQuery, EventDetailDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetEventDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<EventDetailDto> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Events
                .Include(e => e.Organizer)
                .Include(e => e.EventAnswers)
                    .ThenInclude(a => a.Person)
                .Include(e => e.EventTags)
                .FirstOrDefaultAsync(e => e.Id == request.EventId);
            if (result != null) {
                return _mapper.Map<EventDetailDto>(result);
            }
            return null;
        }
    }
}
