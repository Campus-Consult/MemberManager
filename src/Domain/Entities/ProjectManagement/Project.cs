using MemberManager.Domain.Entities.CRM;
using System.Collections.Generic;

namespace MemberManager.Domain.Entities.ProjectManagement
{
    public class Project
    {
        public Project()
        {
            ProjectAssignments = new HashSet<ProjectAssignment>();
            ProjectApplicationLetters = new HashSet<ProjectApplicationLetter>();
        }

        public int Id { get; set; }
        public string Number { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }

        public ICollection<ProjectAssignment> ProjectAssignments { get; set; }
        public ICollection<ProjectApplicationLetter> ProjectApplicationLetters { get; set; }
        public Deal Deal { get; set; }
        public Contact Contact { get; set; }
        public Company Company { get; set; }
    }
}
