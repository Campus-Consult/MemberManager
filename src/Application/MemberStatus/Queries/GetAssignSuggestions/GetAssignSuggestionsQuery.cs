using AutoMapper;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatuss.Queries.GetAssignSuggestions
{
    public class GetAssignSuggestionsQuery : IRequest<PeopleAssignSuggestions>
    {
        public int MemberStatusId { get; set; }
    }

    public class GetAssignSuggestionsQueryHandler : IRequestHandler<GetAssignSuggestionsQuery, PeopleAssignSuggestions>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAssignSuggestionsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PeopleAssignSuggestions> Handle(GetAssignSuggestionsQuery request, CancellationToken cancellationToken)
        {
            return new PeopleAssignSuggestions
            {
                Suggestions = await _context.People
                    // TODO: only if assignable
                    .Select(p => new PeopleAssignSuggestion{
                        Id = p.Id,
                        Name = p.FirstName + " " + p.Surname,
                    })
                    .OrderBy(p => p.Name)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
