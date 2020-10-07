using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class Position
    {
        public Position()
        {
            PersonPositions = new HashSet<PersonPosition>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }

        public ICollection<PersonPosition> PersonPositions { get; set; }
    }
}
