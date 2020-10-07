using System;

namespace MemberManager.Domain.Entities
{
    public class PersonPosition
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int PositionId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public Person Person { get; set; }
        public Position Position { get; set; }
    }
}
