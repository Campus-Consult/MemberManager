using System.Collections.Generic;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatus
{
    public class MemberStatusVm
    {
        public ICollection<MemberStatusLookupDto> MemberStatus { get; set; }
    }
}