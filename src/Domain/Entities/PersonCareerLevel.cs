using System;

namespace MemberManager.Domain.Entities
{
    public class PersonCareerLevel
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int CareerLevelId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public Person Person { get; set; }
        public CareerLevel CareerLevel { get; set; }
    }
}
