using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.ProjectManagement.Project.Commands.CreateProject
{
    public class CreateProjectCommand : IRequest<int>
    {
        public string Number { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
    }

    public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateProjectCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var entity = new Domain.Entities.ProjectManagement.Project
            {
                Number = request.Number,
                Title = request.Title,
                Summary = request.Summary,
            };

            _context.Projects.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
