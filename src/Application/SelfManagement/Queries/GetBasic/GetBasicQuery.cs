using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MemberManager.Application.SelfManagement.Queries.GetBasic
{

    public class GetBasicQuery : IRequest<BasicInfoVm>
    {
        public string Email { get; set; }
    }

    public class GetBasicQueryHandler : IRequestHandler<GetBasicQuery, BasicInfoVm>
    {

        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetBasicQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BasicInfoVm> Handle(GetBasicQuery request, CancellationToken cancellationToken)
        {
            var foundPerson = await _context.People.Where(p => p.EmailAssociaton == request.Email).FirstOrDefaultAsync();
            if (foundPerson == null) {
                return null;
            } else {
                return _mapper.Map<BasicInfoVm>(foundPerson);
            }
        }
    }
}
