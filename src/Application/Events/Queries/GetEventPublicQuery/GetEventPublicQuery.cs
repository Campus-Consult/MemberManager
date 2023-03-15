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
using MemberManager.Application.Common.Exceptions;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.Events.Queries.GetEventPublicQuery
{
    public class GetEventPublicQuery : IRequest<EventDetailPublicDto>
    {
        public int EventId { get; set; }
        public string EventSecretKey { get; set; }
    }

    public class GetEventPublicQueryHandler : IRequestHandler<GetEventPublicQuery, EventDetailPublicDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetEventPublicQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<EventDetailPublicDto> Handle(GetEventPublicQuery request, CancellationToken cancellationToken)
        {
            var evnt = await _context.Events
                .Include(e => e.Organizer)
                .Include(e => e.EventTags)
                .FirstOrDefaultAsync(e => e.Id == request.EventId && e.SecretKey == request.EventSecretKey, cancellationToken);
            if (evnt != null) {
                return _mapper.Map<EventDetailPublicDto>(evnt);
            }
            throw new NotFoundException(nameof(Event), request.EventId);
        }
    }
}
