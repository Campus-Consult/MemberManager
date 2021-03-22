using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelHistory
{
    public class GetCareerLevelHistoryQuery : IRequest<CareerLevelHistoryVm>
    {
        public int CareerLevelId { get; set; }
    }

    public class GetCareerLevelHistoryQueryHandler : IRequestHandler<GetCareerLevelHistoryQuery, CareerLevelHistoryVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCareerLevelHistoryQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CareerLevelHistoryVm> Handle(GetCareerLevelHistoryQuery request, CancellationToken cancellationToken)
        {
            var careerLevel = await _context.CareerLevels
                .Include(c => c.PersonCareerLevels)
                .ThenInclude(p => p.Person)
                .FirstOrDefaultAsync(c => c.Id == request.CareerLevelId, cancellationToken);
            if (careerLevel == null)
            {
                throw new NotFoundException(nameof(careerLevel), request.CareerLevelId);
            }
            return new CareerLevelHistoryVm {
                Assignees = _mapper.ProjectTo<CareerLevelAssignee>(careerLevel.PersonCareerLevels.AsQueryable()).ToList(),
            };
        }
    }
}
