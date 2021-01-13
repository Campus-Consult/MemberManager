using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Common.Exceptions;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees
{
    public class GetCareerLevelWithAssigneesQuery : IRequest<CareerLevelDto>
    {
        public int CareerLevelId { get; set; }
    }

    public class GetCareerLevelWithAssigneesQueryHandler : IRequestHandler<GetCareerLevelWithAssigneesQuery, CareerLevelDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCareerLevelWithAssigneesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CareerLevelDto> Handle(GetCareerLevelWithAssigneesQuery request, CancellationToken cancellationToken)
        {
            var careerLevel = await _context.CareerLevels
                .Include(c => c.PersonCareerLevels)
                .ThenInclude(p => p.Person)
                .FirstOrDefaultAsync(c => c.Id == request.CareerLevelId, cancellationToken);
            if (careerLevel == null)
            {
                throw new NotFoundException(nameof(careerLevel), request.CareerLevelId);
            }
            return _mapper.Map<CareerLevelDto>(careerLevel);
        }
    }
}
