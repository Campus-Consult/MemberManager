using System;

namespace MemberManager.Application.Common.Models
{
    public class AssigneeDto
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}
