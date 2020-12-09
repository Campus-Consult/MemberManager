using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.AssignPosition;
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

    public class AssignPersonPositionCommandTests : TestBase
    {

        public async Task<int> SetupTestPerson(string email="test@campus-consult.org") {
            var createPersonCommand = new CreatePersonCommand { 
                AdressCity = "Test",
                AdressNo = "100",
                AdressStreet = "Test Street",
                AdressZIP = "1234",
                Birthdate = new DateTime(2019, 1, 1),
                EmailAssociaton = email,
                EmailPrivate = "test@asdf.de",
                FirstName = "Test",
                Gender = Gender.DIVERS,
                MobilePrivate = "12345",
                Surname = "Test",
            };

            return await SendAsync(createPersonCommand);
        }

        [Test]
        public async Task CanAssignToMultiplePositions() {
            var personId = await SetupTestPerson();

            var pos1Id = await SendAsync(new CreatePositionCommand {
                Name = "TestPos",
                ShortName = "TP"
            });

            var pos2Id = await SendAsync(new CreatePositionCommand {
                Name = "TestPos2",
                ShortName = "TP2"
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos2Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
            });
        }

        [Test]
        public async Task CanAssignNonOverlappingToPosition() {
            var personId = await SetupTestPerson();

            var pos1Id = await SendAsync(new CreatePositionCommand {
                Name = "TestPos",
                ShortName = "TP"
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
                DismissDateTime = new DateTime(2020, 1, 3),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2019, 1, 1),
                DismissDateTime = new DateTime(2019, 10, 10),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 10, 10),
                DismissDateTime = new DateTime(2020, 11, 11),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 4),
                DismissDateTime = new DateTime(2020, 10, 9),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 12, 4),
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2018, 1, 4),
                DismissDateTime = new DateTime(2018, 10, 9),
            });
        }

        [Test]
        public async Task CantAssignOverlappingToPosition() {
            var personId = await SetupTestPerson();

            var pos1Id = await SendAsync(new CreatePositionCommand {
                Name = "TestPos",
                ShortName = "TP"
            });

            await SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 1),
                DismissDateTime = new DateTime(2020, 1, 4),
            });

            FluentActions.Invoking(() =>
                SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2019, 1, 1),
                DismissDateTime = new DateTime(2020, 10, 10),
            })).Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("PersonId"))
                    .And.Errors["PersonId"].Should().Contain("Person is already assigned to that Position at that Time");

            FluentActions.Invoking(() =>
                SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2019, 1, 1),
                DismissDateTime = new DateTime(2020, 1, 1),
            })).Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("PersonId"))
                    .And.Errors["PersonId"].Should().Contain("Person is already assigned to that Position at that Time");

            FluentActions.Invoking(() =>
                SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 4),
                DismissDateTime = new DateTime(2020, 1, 5),
            })).Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("PersonId"))
                    .And.Errors["PersonId"].Should().Contain("Person is already assigned to that Position at that Time");

            FluentActions.Invoking(() =>
                SendAsync(new AssignPositionCommand {
                PositionId = pos1Id,
                PersonId = personId,
                AssignmentDateTime = new DateTime(2020, 1, 2),
                DismissDateTime = new DateTime(2020, 1, 3),
            })).Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("PersonId"))
                    .And.Errors["PersonId"].Should().Contain("Person is already assigned to that Position at that Time");
        }
    }
}