using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Infrastructure.Identity;
using MemberManager.Infrastructure.Persistence;
using MemberManager.WebUI;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using Respawn;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;

[SetUpFixture]
public class Testing
{   
    private static IConfigurationRoot _configuration;
    public static IServiceScopeFactory _scopeFactory;
    private static string _currentUserId;
    private static string _currentUserEmail;
    private static DateTime _currentTime = new DateTime(2020,01,01);

    private class MockedDateTime : IDateTime
    {
        public DateTime Now => _currentTime;
    }

    private class MockedUserService : ICurrentUserService
    {
        public string UserId => _currentUserId;

        public string GetEmailAssociate()
        {
            return _currentUserEmail;
        }
    }

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true, true)
            .AddEnvironmentVariables();

        _configuration = builder.Build();

        var startup = new Startup(_configuration);

        var services = new ServiceCollection();

        services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
            w.EnvironmentName == "Development" &&
            w.ApplicationName == "MemberManager.WebUI"));

        services.AddLogging();

        startup.ConfigureServices(services);

        // Replace service registration for ICurrentUserService
        // Remove existing registration
        var currentUserServiceDescriptor = services.FirstOrDefault(d =>
            d.ServiceType == typeof(ICurrentUserService));

        services.Remove(currentUserServiceDescriptor);

        // Register testing version
        services.AddTransient<ICurrentUserService, MockedUserService>();

        services.Remove(services.FirstOrDefault(d => d.ServiceType == typeof(IDateTime)));

        services.AddTransient<IDateTime, MockedDateTime>();

        _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();
        

        EnsureDatabase();
    }

    private static void EnsureDatabase()
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        context.Database.EnsureCreated();
    }

    public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
    {
        using var scope = _scopeFactory.CreateScope();

        var mediator = scope.ServiceProvider.GetService<IMediator>();

        return await mediator.Send<TResponse>(request);
    }

    public static async Task SendAsync<TRequest>(TRequest request) where TRequest : IRequest
    {
        using var scope = _scopeFactory.CreateScope();

        var mediator = scope.ServiceProvider.GetService<IMediator>();

        await mediator.Send(request);
    }

    public static async Task<string> RunAsDefaultUserAsync()
    {
        return await RunAsUserAsync("test@local", "Testing1234!");
    }

    public static async Task<string> RunAsUserAsync(string userName, string password)
    {
        using var scope = _scopeFactory.CreateScope();

        var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();

        var alreadyExistsUser = await userManager.FindByNameAsync(userName);

        if (alreadyExistsUser != null) {
            _currentUserId = alreadyExistsUser.Id;
            _currentUserEmail = userName;

            return _currentUserId;
        }

        var user = new ApplicationUser { UserName = userName, Email = userName };

        var result = await userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            _currentUserId = user.Id;
            _currentUserEmail = userName;

            return _currentUserId;
        }

        var errors = string.Join(Environment.NewLine, result.ToApplicationResult().Errors);

        throw new Exception($"Unable to create {userName}.{Environment.NewLine}{errors}");
    }

    public static async Task ResetState()
    {
        
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        context.People.RemoveRange(context.People);
        context.PersonCareerLevels.RemoveRange(context.PersonCareerLevels);
        context.PersonMemberStatus.RemoveRange(context.PersonMemberStatus);
        context.PersonPositions.RemoveRange(context.PersonPositions);
        context.Positions.RemoveRange(context.Positions);
        context.CareerLevels.RemoveRange(context.CareerLevels);
        context.MemberStatus.RemoveRange(context.MemberStatus);
        context.Events.RemoveRange(context.Events);
        await context.SaveChangesAsync();
        _currentUserId = null;
    }

    public static async Task<TEntity> FindAsync<TEntity>(int id)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        return await context.FindAsync<TEntity>(id);
    }

    public static async Task AddAsync<TEntity>(TEntity entity)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        context.Add(entity);

        await context.SaveChangesAsync();
    }

    public static void AssertValidationError(Task task, string errorKey, string errorMessage = null) {
        if (errorMessage == null) {
            FluentActions.Invoking(() => task)
                .Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey(errorKey));
        } else {
            FluentActions.Invoking(() => task)
                .Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey(errorKey))
                .And.Errors[errorKey].Should().Contain(errorMessage);
        }
    }

    public static void SetDateTime(DateTime newNow) {
        _currentTime = newNow;
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
    }
}
