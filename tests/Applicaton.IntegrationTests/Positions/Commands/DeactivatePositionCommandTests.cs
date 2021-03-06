using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.AssignToPosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using MemberManager.Domain.Enums;
using MemberManager.Application.Positions.Queries.GetPositionDetails;
using System.Collections.Generic;
using MemberManager.Application.Positions.Queries.GetPositionsWithAssignees;

namespace MemberManager.Application.IntegrationTests.Positions.Commands
{
    using static Testing;

    public class DeactivatePositionCommandTests : TestBase
    {

        [Test]
        public async Task ShouldRequireValidPositionId()
        {
            var personId = await SetupTestPerson();

            var positionId = await SetupTestPosition();

            var assignPersonToPositionCommand = new AssignToPositionCommand {
                PositionId = positionId,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
            };

            await SendAsync(assignPersonToPositionCommand);

            var deactivatePositionCommand = new DeactivatePositionCommand {
                Id = positionId + 1,
                EndDateTime = new DateTime(2019, 12, 31),
            };

            FluentActions.Invoking(() =>
                SendAsync(deactivatePositionCommand))
                    .Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("Id"))
                    .And.Errors["Id"].Should().Contain("Posten existiert nicht.");
        }

        [Test]
        public async Task ShouldTerminateOngoingAssignments()
        {
            
            var personId = await SetupTestPerson();

            var person2Id = await SetupTestPerson("test2@campus-consult.org");

            var positionId = await SetupTestPosition();

            var assignPersonToPositionCommand = new AssignToPositionCommand {
                PositionId = positionId,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
            };

            await SendAsync(assignPersonToPositionCommand);

            var assignPerson2ToPositionCommand = new AssignToPositionCommand {
                PositionId = positionId,
                PersonId = person2Id,
                AssignmentDateTime = new DateTime(2019, 1, 1),
            };

            await SendAsync(assignPerson2ToPositionCommand);

            var deactivatePositionCommand = new DeactivatePositionCommand {
                Id = positionId,
                EndDateTime = new DateTime(2020, 1, 31),
            };

            await SendAsync(deactivatePositionCommand);

            var getPositionDetailsQuery = new GetPositionDetailsQuery {
                Id = positionId,
                IncludeHistory = true,
            };

            var positionDetails = await SendAsync(getPositionDetailsQuery);

            positionDetails.IsActive.Should().BeFalse();

            List<PositionAssignee> lists = positionDetails.Assignees.ToList();

            lists.Count.Should().Be(2);

            var firstHistory = positionDetails.Assignees.OrderBy(pa => pa.BeginDateTime).First();

            lists[0].BeginDateTime.Should().Be(new DateTime(2019, 1, 1));
            lists[0].EndDateTime.Should().Be(new DateTime(2020, 1, 31));

            lists[1].BeginDateTime.Should().Be(new DateTime(2020, 1, 1));
            lists[1].EndDateTime.Should().Be(new DateTime(2020, 1, 31));
        }

        [Test]
        public async Task CantTerminateIfAssignmentInFuture()
        {
            
            var personId = await SetupTestPerson();

            var person2Id = await SetupTestPerson("test2@campus-consult.org");

            var positionId = await SetupTestPosition();

            var assignPersonToPositionCommand = new AssignToPositionCommand {
                PositionId = positionId,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
            };

            await SendAsync(assignPersonToPositionCommand);

            var assignPerson2ToPositionCommand = new AssignToPositionCommand {
                PositionId = positionId,
                PersonId = person2Id,
                AssignmentDateTime = new DateTime(2019, 1, 1),
            };

            await SendAsync(assignPerson2ToPositionCommand);

            var deactivatePositionCommand = new DeactivatePositionCommand {
                Id = positionId,
                EndDateTime = new DateTime(2019, 12, 31),
            };
            
            FluentActions.Invoking(() =>
                SendAsync(deactivatePositionCommand))
                    .Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("Id"))
                    .And.Errors["Id"].Should().Contain("Posten kann nur zu einem Zeitpunkt deaktiviert werden, wenn in der Zukunft keine Personen mehr zugewiesen werden!");
        }
    }
}
