using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities.ProjectManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.ProjectManagement.Project.Commands.ApplyToProject
{
    public class ApplyToProjectCommand : IRequest<int>
    {
        public int PersonId { get; set; }
        public int ProjectId { get; set; }
        public string Letter { get; set; }
    }

    public class ApplyToProjectCommandHandler : IRequestHandler<ApplyToProjectCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ApplyToProjectCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> Handle(ApplyToProjectCommand request, CancellationToken cancellationToken)
        {
            var entity = new ProjectApplicationLetter
            {
                Letter = request.Letter,
                PersonId = request.PersonId,
                ProjectId = request.ProjectId
            };

            _context.ProjectApplicationLetters.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
