using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Events.Common;

namespace MemberManager.Application.Events.Queries.GetAllTags
{
    public class GetAllTagsQuery : IRequest<List<string>> {}

    public class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, List<string>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllTagsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<string>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            return await _context.EventTags.Select(t => t.Tag).Distinct().OrderBy(t => t).ToListAsync();
        }
    }
}
