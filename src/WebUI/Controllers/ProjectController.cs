using MemberManager.Application.ProjectManagement.Project.Commands.CreateProject;
using MemberManager.Application.ProjectManagement.Project.Queries.GetProjectDetail;
using MemberManager.Application.ProjectManagement.Project.Queries.GetProjects;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MemberManager.WebUI.Controllers
{
    public class ProjectController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<ProjectsVm>> Get()
        {
            return await Mediator.Send(new GetProjectsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDetailVm>> Get(int id)
        {
            return await Mediator.Send(new GetProjectDetailQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateProjectCommand command)
        {
            return await Mediator.Send(command);
        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult> Update(int id, UpdateProjectCommand command)
        //{
        //    if (id != command.Id)
        //    {
        //        return BadRequest();
        //    }

        //    await Mediator.Send(command);

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id)
        //{
        //    await Mediator.Send(new DeleteProjectCommand { Id = id });

        //    return NoContent();
        //}
    }
}
