using MemberManager.Domain.Entities;
using MemberManager.Domain.Entities.Common;
using MemberManager.Domain.Entities.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        // Common
        DbSet<Person> People { get; set; }

        DbSet<CareerLevel> CareerLevels { get; set; }
        DbSet<PersonCareerLevel> PersonCareerLevels { get; set; }

        DbSet<Domain.Entities.MemberStatus> MemberStatus { get; set; }
        DbSet<PersonMemberStatus> PersonMemberStatus { get; set; }

        DbSet<Position> Positions { get; set; }
        DbSet<PersonPosition> PersonPositions { get; set; }

        DbSet<ApplicationLetter> ApplicationLetters { get; set; }

        // ProjectManagement
        DbSet<Project> Projects { get; set; }
        DbSet<ProjectAssignment> ProjectAssignments { get; set; }
        DbSet<ProjectApplicationLetter> ProjectApplicationLetters { get; set; }

        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
