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
                .Include(p => p.PersonPositions).ThenInclude(pp => pp.Position)
                .Include(p => p.PersonMemberStatus).ThenInclude(pp => pp.MemberStatus)
                .Include(p => p.PersonCareerLevels).ThenInclude(pp => pp.CareerLevel)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Person), request.Id);
            }

            var personDetailVm = _mapper.Map<PersonDetailVm>(entity);
            personDetailVm.MemberStatus = entity.PersonMemberStatus
                .OrderBy(p => p.BeginDateTime).ThenBy(p => p.EndDateTime)
                .Select(PersonMemberStatusVm.fromPersonMemberStatus).ToList();
            personDetailVm.CareerLevels = entity.PersonCareerLevels
                .OrderBy(p => p.BeginDateTime).ThenBy(p => p.EndDateTime)
                .Select(PersonCareerLevelVm.fromPersonCareerLevel).ToList();
            personDetailVm.Positions = entity.PersonPositions
                .OrderBy(p => p.BeginDateTime).ThenBy(p => p.EndDateTime)
                .Select(PersonPositionVm.fromPersonPosition).ToList();
            return personDetailVm;
        }
    }
}
