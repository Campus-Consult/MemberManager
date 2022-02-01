using System.Collections.Generic;

namespace MemberManager.Application.People.Queries.GetBirthdayPeople
{
    public class BirthdayPeopleDto
    {
        public IList<PersonWithBirthdateDto> People { get; set; }
    }
}
