using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatusHistory
{
    public class GetMemberStatusHistoryQuery : IRequest<MemberStatusHistoryVm>
    {
        public int Id { get; set; }
    }

    public class GetMemberStatusHistoryQueryHandler : IRequestHandler<GetMemberStatusHistoryQuery, MemberStatusHistoryVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMemberStatusHistoryQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberStatusHistoryVm> Handle(GetMemberStatusHistoryQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus
                .Include(ms => ms.PersonMemberStatus)
                .ThenInclude(pms => pms.Person)
                .FirstAsync(ms => ms.Id == request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus), request.Id);
            }

            return _mapper.Map<MemberStatusHistoryVm>(entity);
        }
    }
}
