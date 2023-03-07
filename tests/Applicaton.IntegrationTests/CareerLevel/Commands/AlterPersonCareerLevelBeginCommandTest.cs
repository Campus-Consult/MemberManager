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
using MemberManager.Application.CareerLevels.Commands.AlterPersonCareerLevelStart;

namespace MemberManager.Application.IntegrationTests.CareerLevel.Commands
{
    using static Testing;

    public class AlterPersonCareerLevelStartCommandTest : TestBase
    {
        [Test]
        public async Task CanChangeToEarlierTime() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            var lastChangeId = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId,
            });

            // change last one to 2 days earlier
            await SendAsync(new AlterPersonCareerLevelStartCommand {
                PersonCareerLevelId = lastChangeId,
                NewBeginTime = new DateTime(2020, 01, 03),
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels[2].BeginDateTime.Should().Be(new DateTime(2020,01,03));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(new DateTime(2020,01,03));
        }

        [Test]
        public async Task CanChangeToLaterTime() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            var lastChangeId = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId,
            });

            // change last one to 2 days later
            await SendAsync(new AlterPersonCareerLevelStartCommand {
                PersonCareerLevelId = lastChangeId,
                NewBeginTime = new DateTime(2020, 01, 07),
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels[2].BeginDateTime.Should().Be(new DateTime(2020,01,07));
            personDetails.CareerLevels[1].EndDateTime.Should().Be(new DateTime(2020,01,07));
        }

        [Test]
        public async Task CanChangeFirst() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            var firstChangeId = await SendAsync(new ChangePersonCareerLevelCommand {
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
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId,
            });

            // change first to some early time
            await SendAsync(new AlterPersonCareerLevelStartCommand {
                PersonCareerLevelId = firstChangeId,
                NewBeginTime = new DateTime(2010, 01, 07),
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            personDetails.CareerLevels[0].BeginDateTime.Should().Be(new DateTime(2010,01,07));
        }

        [Test]
        public async Task CannotChangeTooLate() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            var firstChangedId = await SendAsync(new ChangePersonCareerLevelCommand {
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
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId,
            });

            // change to the time the next change occurred, invalid!
            AssertValidationError(SendAsync(new AlterPersonCareerLevelStartCommand {
                PersonCareerLevelId = firstChangedId,
                NewBeginTime = new DateTime(2020, 01, 02),
            }), "PersonCareerLevelId", "Kann die Zeit nicht außerhalb der Rahmen verändern!");
        }

        [Test]
        public async Task CannotChangeTooEarly() {
            var personId = await SetupTestPerson();
            var level1 = await SetupTestCareerLevel("1");
            var level2 = await SetupTestCareerLevel("2");
            var level3 = await SetupTestCareerLevel("3");

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            var lastChangeId = await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonCareerLevelCommand {
                CareerLevelId = level3,
                ChangeDateTime = new DateTime(2020,01,02),
                PersonId = personId,
            });

            // change to the time the next change occurred, invalid!
            AssertValidationError(SendAsync(new AlterPersonCareerLevelStartCommand {
                PersonCareerLevelId = lastChangeId,
                NewBeginTime = new DateTime(2020, 01, 02),
            }), "PersonCareerLevelId", "Kann die Zeit nicht außerhalb der Rahmen verändern!");
        }
    }
}
