using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.DeactivatePosition;
using MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand;
using MemberManager.Application.CareerLevels.Commands.ChangePersonCareerLevel;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;
using MemberManager.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using MemberManager.Domain.Enums;
using System.Collections.Generic;
using MemberManager.Application.People.Queries.GetPersonDetail;
using MemberManager.Application.CareerLevels.Commands.RemovePersonCareerLevelChange;

namespace MemberManager.Application.IntegrationTests.CareerLevel.Commands
{
    using static Testing;

    public class RemovePersonCareerLevelChangeCommandTest : TestBase
    {
        [Test]
        public async Task TestRemovingMiddleChange() {

            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            var levelChangeToRemoveID = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            await SendAsync(new RemovePersonCareerLevelChangeCommand {
                PersonCareerLevelId = levelChangeToRemoveID,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels.Count.Should().Be(2);

            personDetails.CareerLevels[0].CareerLevelId.Should().Be(level1);
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2020,01,01));
            personDetails.CareerLevels[0].EndDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].CareerLevelId.Should().Be(level2);
            personDetails.CareerLevels[1].BeginDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(null);
        }


        [Test]
        public async Task TestRemovingLastChange() {

            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            var levelChangeToRemoveID = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            await SendAsync(new RemovePersonCareerLevelChangeCommand {
                PersonCareerLevelId = levelChangeToRemoveID,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels.Count.Should().Be(2);

            personDetails.CareerLevels[0].CareerLevelId.Should().Be(level1);
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2020,01,01));
            personDetails.CareerLevels[0].EndDateTime.Should().Be(new DateTime(2020,01,02));
            personDetails.CareerLevels[1].CareerLevelId.Should().Be(level3);
            personDetails.CareerLevels[1].BeginDateTime.Should().Be(new DateTime(2020,01,02));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(null);
        }

        [Test]
        public async Task TestRemovingFirstChange() {

            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            var levelChangeToRemoveID = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            await SendAsync(new RemovePersonCareerLevelChangeCommand {
                PersonCareerLevelId = levelChangeToRemoveID,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels.Count.Should().Be(2);

            personDetails.CareerLevels[0].CareerLevelId.Should().Be(level3);
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2020,01,02));
            personDetails.CareerLevels[0].EndDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].CareerLevelId.Should().Be(level2);
            personDetails.CareerLevels[1].BeginDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(null);
        }

        [Test]
        public async Task TestCantRemoveAChangeTwice() {

            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            var levelChangeToRemoveID = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            await SendAsync(new RemovePersonCareerLevelChangeCommand {
                PersonCareerLevelId = levelChangeToRemoveID,
            });

            AssertValidationError(SendAsync(new RemovePersonCareerLevelChangeCommand {
                PersonCareerLevelId = levelChangeToRemoveID,
            }), "PersonCareerLevelId", "Zuordnung von Person zu Karrierelevel existiert nicht!");
        }
    }
}