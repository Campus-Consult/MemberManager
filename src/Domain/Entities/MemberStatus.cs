using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class MemberStatus
    {
        public MemberStatus()
        {
            PersonMemberStatus = new HashSet<PersonMemberStatus>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<PersonMemberStatus> PersonMemberStatus { get; set; }


    }
}
