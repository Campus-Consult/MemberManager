using System;

namespace MemberManager.Domain.Entities
{
    public class PersonMemberStatus
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int MemberStatusId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public Person Person { get; set; }
        public MemberStatus MemberStatus { get; set; }
    }
}
