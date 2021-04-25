using System.Collections.Generic;

namespace MemberManager.Application.ProjectManagement.Project.Queries.GetProjects
{
    public class ProjectsVm
    {
        public ICollection<ProjectLookupDto> Projects { get; set; }
    }
}