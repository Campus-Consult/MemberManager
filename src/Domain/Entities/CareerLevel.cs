using System;
using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class CareerLevel
    {
        public CareerLevel()
        {
            PersonCareerLevels = new HashSet<PersonCareerLevel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }

        public ICollection<PersonCareerLevel> PersonCareerLevels { get; set; }
    }
}
