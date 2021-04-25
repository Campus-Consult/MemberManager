using MemberManager.Application.Common.Mappings;

namespace MemberManager.Application.ProjectManagement.Project.Queries.GetProjects
{
    public class ProjectLookupDto : IMapFrom<Domain.Entities.ProjectManagement.Project>
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string Title { get; set; }
    }
}