using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Positions.Queries.GetPositionsWithAssignees;
using MemberManager.Application.Common.Exceptions;

namespace MemberManager.Application.Positions.Queries.GetPositionDetails
{
    public class GetPositionDetailsQuery : IRequest<PositionDto>
    {
        public int Id { get; set; }
        public bool IncludeHistory { get; set; }
    }

    public class GetPositionDetailsQueryHandler : IRequestHandler<GetPositionDetailsQuery, PositionDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPositionDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PositionDto> Handle(GetPositionDetailsQuery request, CancellationToken cancellationToken)
        {
            var position = await _context.Positions
                .AsNoTracking()
                .Include(p => p.PersonPositions)
                .ThenInclude(pp => pp.Person)
                .Where(p => p.Id == request.Id)
                .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            
            if (position == null) {
                throw new NotFoundException("Position", request.Id);
            }
            if (!request.IncludeHistory) {
                // this is kinda bad, but filtering on includes doesn't seem to be supported yet
                position.Assignees = position.Assignees.Where(a => a.EndDateTime == null).ToList();
            }
            return position;
        }
    }
}
