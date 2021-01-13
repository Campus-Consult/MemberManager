using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.People.Queries.GetPeopleBasicInfo
{
    public class GetPeopleBasicInfoQuery : IRequest<PeopleBasicInfoVm>
    {
    }

    public class PeopleBasicInfoVmQueryHandler : IRequestHandler<GetPeopleBasicInfoQuery, PeopleBasicInfoVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PeopleBasicInfoVmQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PeopleBasicInfoVm> Handle(GetPeopleBasicInfoQuery request, CancellationToken cancellationToken)
        {
            var people = await _context.People
                .Include(p => p.PersonCareerLevels).ThenInclude(pc => pc.CareerLevel)
                .Include(p => p.PersonMemberStatus).ThenInclude(pm => pm.MemberStatus)
                .Include(p => p.PersonPositions).ThenInclude(pp => pp.Position)
                .Select(person => new PersonBasicInfoLookupDto{
                    Id = person.Id,
                    FistName = person.FirstName,
                    Surname = person.Surname,
                    CurrentCareerLevel = person.PersonCareerLevels
                        .Where(cl => cl.EndDateTime == null).Select(pc => pc.CareerLevel.Name).FirstOrDefault(),
                    CurrentMemberStatus = person.PersonMemberStatus
                        .Where(cl => cl.EndDateTime == null).Select(pm => pm.MemberStatus.Name).FirstOrDefault(),
                    CurrentPositions = person.PersonPositions
                        .Where(cl => cl.EndDateTime == null).Select(pp => _mapper.Map<SimplePositionDto>(pp.Position)).ToList(),
                } ).ToListAsync();
            
            return new PeopleBasicInfoVm {
                People = people,
            };
        }
    }
}
