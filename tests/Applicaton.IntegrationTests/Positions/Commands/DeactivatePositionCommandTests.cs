using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.AssignPosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using MemberManager.Domain.Enums;

namespace MemberManager.Application.IntegrationTests.Positions.Commands
{
    using static Testing;

    public class DeactivatePositionCommandTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidPositionId()
        {
            var createPersonCommand = new CreatePersonCommand { 
                AdressCity = "Test",
                AdressNo = "100",
                AdressStreet = "Test Street",
                AdressZIP = "1234",
                Birthdate = new DateTime(2019, 1, 1),
                EmailAssociaton = "test@campus-consult.org",
                EmailPrivate = "test@asdf.de",
                FirstName = "Test",
                Gender = Gender.DIVERS,
                MobilePrivate = "12345",
                Surname = "Test",
            };

            var personId = await SendAsync(createPersonCommand);

            var createPositionCommand = new CreatePositionCommand {
                Name = "TestPos",
                ShortName = "TP"
            };

            var positionId = await SendAsync(createPositionCommand);

            var assignPersonToPositionCommand = new AssignPositionCommand {
                Id = positionId,
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
                    .And.Errors["Id"].Should().Contain("Position does not exist.");
        }
    }
}
