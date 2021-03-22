using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Models;
using System;

namespace MemberManager.Application.People.Queries.GetCurrentCareerLevel
{
    public class GetCurrentCareerLevelQuery : IRequest<CareerLevelAssignmentDto>
    {
        public int PersonId { get; set; }
        public DateTime? Time { get; set; }
    }

    public class GetCurrentCareerLevelQueryHandler : IRequestHandler<GetCurrentCareerLevelQuery, CareerLevelAssignmentDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IDateTime _dateTimeService;

        public GetCurrentCareerLevelQueryHandler(IApplicationDbContext context, IMapper mapper, IDateTime dateTimeService)
        {
            _context = context;
            _mapper = mapper;
            _dateTimeService = dateTimeService;
        }

        public async Task<CareerLevelAssignmentDto> Handle(GetCurrentCareerLevelQuery request, CancellationToken cancellationToken)
        {
            var person = await _context.People
                .Include(p => p.PersonCareerLevels)
                .ThenInclude(pc => pc.CareerLevel)
                .Where(p => p.Id == request.PersonId)
                .FirstOrDefaultAsync();
            
            return person?.GetCurrentCareerLevel(request.Time ?? _dateTimeService.Now)?.ToCareerLevelAssignmentDto();
        }
    }
}
