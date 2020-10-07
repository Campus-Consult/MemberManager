using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPersonDetail
{
    public class GetPersonDetailQuery : IRequest<PersonDetailVm>
    {
        public int Id { get; set; }
    }

    public class GetPersonDetailQueryHandler : IRequestHandler<GetPersonDetailQuery, PersonDetailVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPersonDetailQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PersonDetailVm> Handle(GetPersonDetailQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.People
                .FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Person), request.Id);
            }

            return _mapper.Map<PersonDetailVm>(entity);
        }
    }
}
