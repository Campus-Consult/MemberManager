using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Queries.GetDismissSuggestions
{
    public class GetDismissSuggestionsQuery : IRequest<PeopleDismissSuggestions>
    {
        public int PositionId { get; set; }
    }

    public class GetDismissSuggestionsQueryHandler : IRequestHandler<GetDismissSuggestionsQuery, PeopleDismissSuggestions>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTime;

        public GetDismissSuggestionsQueryHandler(IApplicationDbContext context, IDateTime dateTime)
        {
            _context = context;
            _dateTime = dateTime;
        }

        public async Task<PeopleDismissSuggestions> Handle(GetDismissSuggestionsQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions
                .Include(p => p.PersonPositions)
                .ThenInclude(pp => pp.Person)
                .FirstAsync(p => p.Id == request.PositionId);

            if (entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus));
            }

            return new PeopleDismissSuggestions
            {
                Suggestions = entity.PersonPositions
                    .Where(pp => pp.EndDateTime == null || pp.EndDateTime >= _dateTime.Now)
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
