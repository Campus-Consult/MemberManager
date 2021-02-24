using System.Collections.Generic;

namespace MemberManager.Application.People.Queries.GetPeopleWithBasicInfo
{
    public class PeopleWithBasicInfoVm
    {
        public IList<PersonWithBasicInfoLookupDto> People { get; set; }
    }
}
