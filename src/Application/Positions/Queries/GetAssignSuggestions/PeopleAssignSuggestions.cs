using System.Collections.Generic;

namespace MemberManager.Application.Positions.Queries.GetAssignSuggestions
{
    public class PeopleAssignSuggestions
    {
        public ICollection<PeopleAssignSuggestion> Suggestions { get; set; }
    }

    public class PeopleAssignSuggestion
    {
        public string Name { get; set; }
        public int Id { get; set; }
    }
}