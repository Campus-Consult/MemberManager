using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.ProjectManagement.Project.Queries.GetProjectDetail
{
    public class GetProjectDetailQuery : IRequest<ProjectDetailVm>
    {
        public int Id { get; set; }
    }

    public class GetProjectDetailQueryHandler : IRequestHandler<GetProjectDetailQuery, ProjectDetailVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetProjectDetailQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProjectDetailVm> Handle(GetProjectDetailQuery request, CancellationToken cancellationToken)
        {
            var project = await _context.Projects
                .AsNoTracking()
                .Include(p => p.ProjectApplicationLetters)
                .ThenInclude(pp => pp.Person)
                .Where(p => p.Id == request.Id)
                .ProjectTo<ProjectDetailVm>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (project == null)
            {
                throw new NotFoundException("Project", request.Id);
            }
            return project;
        }
    }
}
