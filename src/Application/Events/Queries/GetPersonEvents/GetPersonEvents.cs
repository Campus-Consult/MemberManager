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

namespace MemberManager.Application.Events.Queries.GetPersonEvents
{
    public class GetPersonEventsQuery : IRequest<List<EventAnswerWithEventDto>> {
        public int PersonId { get; set; }
    }

    public class GetPersonEventsQueryHandler : IRequestHandler<GetPersonEventsQuery, List<EventAnswerWithEventDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPersonEventsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EventAnswerWithEventDto>> Handle(GetPersonEventsQuery request, CancellationToken cancellationToken)
        {
            return await _context.EventAnswers
                .Include(a => a.Event).ThenInclude(e => e.EventTags)
                .Where(a => a.PersonId == request.PersonId)
                .ProjectTo<EventAnswerWithEventDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
