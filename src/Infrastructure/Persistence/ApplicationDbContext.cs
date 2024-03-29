﻿using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Common;
using MemberManager.Domain.Entities;
using MemberManager.Infrastructure.Identity;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using System.Data;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTime _dateTime;
        private IDbContextTransaction _currentTransaction;

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions,
            ICurrentUserService currentUserService,
            IDateTime dateTime) : base(options, operationalStoreOptions)
        {
            _currentUserService = currentUserService;
            _dateTime = dateTime;
        }

        public DbSet<Person> People { get; set; }

        public DbSet<CareerLevel> CareerLevels { get; set; }
        public DbSet<PersonCareerLevel> PersonCareerLevels { get; set; }

        public DbSet<MemberStatus> MemberStatus { get; set; }
        public DbSet<PersonMemberStatus> PersonMemberStatus { get; set; }

        public DbSet<Position> Positions { get; set; }
        public DbSet<PersonPosition> PersonPositions { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventAnswer> EventAnswers { get; set; }
        public DbSet<EventTag> EventTags { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = _currentUserService.UserId;
                        entry.Entity.Created = _dateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedBy = _currentUserService.UserId;
                        entry.Entity.LastModified = _dateTime.Now;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                return;
            }

            _currentTransaction = await base.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted).ConfigureAwait(false);
        }

        public async Task CommitTransactionAsync()
        {
            try
            {
                await SaveChangesAsync().ConfigureAwait(false);

                _currentTransaction?.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);

            builder.Entity<Person>()
                .Property(p => p.EmailAssociaton)
                .IsRequired();
            builder.Entity<Person>()
                .HasIndex(p => p.EmailAssociaton)
                .IsUnique();
            
            builder.Entity<EventAnswer>()
                .HasOne<Event>(p => p.Event)
                .WithMany(a => a.EventAnswers)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<EventAnswer>()
                .HasOne<Person>(p => p.Person)
                .WithMany(a => a.EventAnswers)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Event>()
                .HasOne<Person>(e => e.Organizer)
                .WithMany(p => p.OrganizedEvents)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.Entity<Event>()
                .Property(e => e.Name)
                .IsRequired();
            
            builder.Entity<Event>()
                .Property(e => e.Start)
                .IsRequired();
            
            builder.Entity<Event>()
                .Property(e => e.End)
                .IsRequired();
            
            builder.Entity<Event>()
                .Property(e => e.SecretKey)
                .IsRequired();
            
            builder.Entity<EventAnswer>()
                .Property(e => e.AnswerKind)
                .IsRequired();

            builder.Entity<EventTag>()
                .HasKey(e => new {e.EventId, e.Tag});
        }
    }
}
