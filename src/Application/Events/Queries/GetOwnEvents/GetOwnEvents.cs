using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Events.Common;
using MemberManager.Application.Events.Queries.GetPersonEvents;

namespace MemberManager.Application.Events.Queries.GetOwnEvents
{
    public class GetOwnEventsQuery : IRequest<List<EventAnswerWithEventDto>> {}

    public class GetOwnEventsQueryHandler : IRequestHandler<GetOwnEventsQuery, List<EventAnswerWithEventDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUser;

        public GetOwnEventsQueryHandler(IApplicationDbContext context, IMediator mediator, ICurrentUserService currentUser)
        {
            _context = context;
            _mediator = mediator;
            _currentUser = currentUser;
        }

        public async Task<List<EventAnswerWithEventDto>> Handle(GetOwnEventsQuery request, CancellationToken cancellationToken)
        {
            var emailAssociation = _currentUser.GetEmailAssociate();
            var person = await _context.People.FirstOrDefaultAsync(p => p.EmailAssociaton == emailAssociation);
            if (person == null) {
                return new List<EventAnswerWithEventDto>();
            } else {
                return await _mediator.Send(new GetPersonEventsQuery {
                    PersonId = person.Id,
                });
            }
        }
    }
}
