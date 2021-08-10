using System.Collections.Generic;

namespace MemberManager.Application.MemberStatuss.Queries.GetMemberStatus
{
    public class MemberStatusVm
    {
        public ICollection<MemberStatusLookupDto> MemberStatus { get; set; }
    }
}