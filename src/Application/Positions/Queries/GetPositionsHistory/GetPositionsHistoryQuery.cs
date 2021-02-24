using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Queries.GetPositionsHistory
{
    public class GetPositionsHistoryQuery : IRequest<PositionsHistoryVm>
    {
        public int Id { get; set; }
    }

    public class GetPositionsHistoryQueryHandler : IRequestHandler<GetPositionsHistoryQuery, PositionsHistoryVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPositionsHistoryQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PositionsHistoryVm> Handle(GetPositionsHistoryQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions
                .Include(ms => ms.PersonPositions)
                .ThenInclude(pms => pms.Person)
                .FirstAsync(ms => ms.Id == request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Positions), request.Id);
            }

            return _mapper.Map<PositionsHistoryVm>(entity);
        }
    }
}
