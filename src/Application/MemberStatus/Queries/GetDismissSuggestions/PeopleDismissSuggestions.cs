using System.Collections.Generic;

namespace MemberManager.Application.MemberStatus.Queries.GetDismissSuggestions
{
    public class PeopleDismissSuggestions
    {
        public ICollection<PeopleDismissSuggestion> Suggestions { get; set; }
    }

    public class PeopleDismissSuggestion
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
