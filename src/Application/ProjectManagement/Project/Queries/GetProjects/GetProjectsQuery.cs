using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.ProjectManagement.Project.Queries.GetProjects
{
    public class GetProjectsQuery : IRequest<ProjectsVm>
    {
    }

    public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, ProjectsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetProjectsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProjectsVm> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
        {
            return new ProjectsVm
            {
                Projects = await _context.Projects
                    .AsNoTracking()
                    .Include(p => p.ProjectApplicationLetters)
                    .ProjectTo<ProjectLookupDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
