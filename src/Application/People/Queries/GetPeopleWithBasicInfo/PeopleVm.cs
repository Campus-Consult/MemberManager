using System.Collections.Generic;

namespace MemberManager.Application.People.Queries.GetPeopleBasicInfo
{
    public class PeopleBasicInfoVm
    {
        public IList<PersonBasicInfoLookupDto> People { get; set; }
    }
}
