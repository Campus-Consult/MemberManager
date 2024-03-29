﻿using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Person> People { get; set; }

        DbSet<CareerLevel> CareerLevels { get; set; }
        DbSet<PersonCareerLevel> PersonCareerLevels { get; set; }

        DbSet<Domain.Entities.MemberStatus> MemberStatus { get; set; }
        DbSet<PersonMemberStatus> PersonMemberStatus { get; set; }

        DbSet<Position> Positions { get; set; }
        DbSet<PersonPosition> PersonPositions { get; set; }
        DbSet<Event> Events { get; set; }
        DbSet<EventAnswer> EventAnswers { get; set; }
        DbSet<EventTag> EventTags { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
