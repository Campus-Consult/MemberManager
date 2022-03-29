using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.People.Queries.GetPersonDetail;

namespace MemberManager.Application.SelfManagement.Queries.GetSelf
{

    public class GetSelfQuery : IRequest<PersonDetailVm>
    {
        public string Email { get; set; }
    }

    public class GetSelfQueryHandler : IRequestHandler<GetSelfQuery, PersonDetailVm>
    {

        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public GetSelfQueryHandler(IApplicationDbContext context, IMapper mapper, IMediator mediator)
        {
            _context = context;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<PersonDetailVm> Handle(GetSelfQuery request, CancellationToken cancellationToken)
        {
            var foundPerson = await _context.People.Where(p => p.EmailAssociaton == request.Email).FirstOrDefaultAsync();
            if (foundPerson == null) {
                return null;
            } else {
                return await _mediator.Send(new GetPersonDetailQuery {
                    Id = foundPerson.Id
                });
            }
        }
    }
}
