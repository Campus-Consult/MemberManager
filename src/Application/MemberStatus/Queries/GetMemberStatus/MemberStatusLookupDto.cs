using MemberManager.Application.Common.Mappings;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatus
{
    public class MemberStatusLookupDto : IMapFrom<Domain.Entities.MemberStatus>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
    }
}