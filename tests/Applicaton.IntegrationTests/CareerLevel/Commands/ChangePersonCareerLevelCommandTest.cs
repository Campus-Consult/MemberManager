using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Application.Positions.Commands.AssignPosition;
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

namespace MemberManager.Application.IntegrationTests.CareerLevel.Commands
{
    using static Testing;

    public class ChangePersonCareerLevelCommandTest : TestBase
    {
        [Test]
        public async Task CanChangeCareerLevelMultipleTimes() {
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

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels.Count.Should().Be(3);

            personDetails.CareerLevels[0].CareerLevelId.Should().Be(level1);
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2020,01,01));
            personDetails.CareerLevels[0].EndDateTime.Should().Be(new DateTime(2020,01,02));
            personDetails.CareerLevels[1].CareerLevelId.Should().Be(level3);
            personDetails.CareerLevels[1].BeginDateTime.Should().Be(new DateTime(2020,01,02));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[2].CareerLevelId.Should().Be(level2);
            personDetails.CareerLevels[2].BeginDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[2].EndDateTime.Should().Be(null);
        }

        [Test]
        public async Task ChangingToCurrentFails() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            AssertValidationError(SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            }), "ChangeDateTime", "Person ist bereits diesem Karrierelevel zugeordnet!");
        }

        [Test]
        public async Task SameCareerLevelChangesAreMerged() {
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
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2019,01,03),
                PersonId = personId,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels.Count.Should().Be(2);

            personDetails.CareerLevels[0].CareerLevelId.Should().Be(level1);
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2019,01,03));
            personDetails.CareerLevels[0].EndDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].CareerLevelId.Should().Be(level3);
            personDetails.CareerLevels[1].BeginDateTime.Should().Be(new DateTime(2020,01,05));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(null);
        }
    }
}