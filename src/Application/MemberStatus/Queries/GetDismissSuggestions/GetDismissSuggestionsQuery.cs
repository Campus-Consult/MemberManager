using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatus.Queries.GetDismissSuggestions
{
    public class GetDismissSuggestionsQuery : IRequest<PeopleDismissSuggestions>
    {
        public int MemberStatusId { get; set; }
    }

    public class GetDismissSuggestionsQueryHandler : IRequestHandler<GetDismissSuggestionsQuery, PeopleDismissSuggestions>
    {
        private readonly IApplicationDbContext _context;

        public GetDismissSuggestionsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PeopleDismissSuggestions> Handle(GetDismissSuggestionsQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus
                .Include(ms => ms.PersonMemberStatus)
                .ThenInclude(pms => pms.Person)
                .FirstAsync(ms => ms.Id == request.MemberStatusId);

            if (entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus));
            }

            return new PeopleDismissSuggestions
            {
                Suggestions = entity.PersonMemberStatus
                    .Where(pms => pms.EndDateTime == null)
                    .Select(p => new PeopleDismissSuggestion
                    {
                        Id = p.Person.Id,
                        Name = p.Person.FirstName + " " + p.Person.Surname,
                    })
                    .OrderBy(p => p.Name)
                    .ToList()
            };
        }
    }
}
