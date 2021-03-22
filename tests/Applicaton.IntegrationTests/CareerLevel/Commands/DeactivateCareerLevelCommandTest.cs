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
using MemberManager.Application.CareerLevels.Commands.DeactivateCareerLevel;
using MemberManager.Application.CareerLevels.Commands.ReactivateCareerLevel;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelHistory;

namespace MemberManager.Application.IntegrationTests.CareerLevel.Commands
{
    using static Testing;

    public class DeactivateCareerLevelCommandTest : TestBase
    {
        [Test]
        public async Task CanDeactivateAndReactivateCareerLevel() {
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");

            AssertValidationError(SendAsync(new DeactivateCareerLevelCommand {
                CareerLevelId = level1,
                NewCareerLevelId = level1,
            }), "NewCareerLevelId", "Neues Karriereleves das Gleiche wie das Alte!");

            await SendAsync(new DeactivateCareerLevelCommand {
                CareerLevelId = level1,
                NewCareerLevelId = level2,
            });

            AssertValidationError(SendAsync(new DeactivateCareerLevelCommand {
                CareerLevelId = level1,
                NewCareerLevelId = level2,
            }), "CareerLevelId", "Das Karrierelevel ist nicht aktiv!");

            var careerLevel1 = await SendAsync(new GetCareerLevelWithAssigneesQuery {
                CareerLevelId = level1,
            });

            careerLevel1.IsActive.Should().BeFalse();

            await SendAsync(new ReactivateCareerLevelCommand {
                CareerLevelId = level1,
            });

            careerLevel1 = await SendAsync(new GetCareerLevelWithAssigneesQuery {
                CareerLevelId = level1,
            });

            careerLevel1.IsActive.Should().BeTrue();

            AssertValidationError(SendAsync(new ReactivateCareerLevelCommand {
                CareerLevelId = level1,
            }), "CareerLevelId", "Das Karrierelevel ist aktiv!");

        }

        [Test]
        public async Task DeactivatingMovesEveryoneActiveToTheNewCareerLevel() {
            var personId1 = await SetupTestPerson("test1@campus-consult.org");
            var personId2 = await SetupTestPerson("test2@campus-consult.org");
            var personId3 = await SetupTestPerson("test3@campus-consult.org");
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId1,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId1,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId2,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId2,
            });

            await SendAsync(new DeactivateCareerLevelCommand {
                CareerLevelId = level1,
                NewCareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,03),
            });

            var careerLevel1 = await SendAsync(new GetCareerLevelHistoryQuery {
                CareerLevelId = level1,
            });

            var assignees = careerLevel1.Assignees.OrderBy(a => a.BeginDateTime).ToList();
            assignees[0].PersonId.Should().Equals(personId1);
            assignees[0].BeginDateTime.Should().Equals(new DateTime(2020,01,01));
            assignees[0].EndDateTime.Should().Equals(new DateTime(2020,01,03));
            assignees[1].PersonId.Should().Equals(personId2);
        }
    }
}