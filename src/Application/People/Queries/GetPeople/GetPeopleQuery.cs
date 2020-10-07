using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.People.Queries.GetPeople
{
    public class GetPeopleQuery : IRequest<PeopleVm>
    {
    }

    public class GetPeopleQueryHandler : IRequestHandler<GetPeopleQuery, PeopleVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPeopleQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PeopleVm> Handle(GetPeopleQuery request, CancellationToken cancellationToken)
        {
            return new PeopleVm
            {
                People = await _context.People
                    .ProjectTo<PersonLookupDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.Surname)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
