using MemberManager.Application.Common.Mappings;

namespace MemberManager.Application.ProjectManagement.Project.Queries.GetProjectDetail
{
    public class ProjectDetailVm: IMapFrom<Domain.Entities.ProjectManagement.Project>
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
    }
}