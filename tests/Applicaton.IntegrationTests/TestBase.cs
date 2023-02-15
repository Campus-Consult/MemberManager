using FluentAssertions;
using MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand;
using MemberManager.Application.MemberStatuss.Commands.CreateMemberStatus;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.People.Queries.GetPersonDetail;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Domain.Enums;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MemberManager.Application.IntegrationTests
{
    using static Testing;

    public class TestBase
    {
        [SetUp]
        public async Task TestSetUp()
        {
            await ResetState();
        }
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

        public async Task<int> SetupTestPosition(string name = "TestPos", string shortName = "TP") {
            var createPositionCommand = new CreatePositionCommand {
                Name = name,
                ShortName = shortName,
            };

            return await SendAsync(createPositionCommand);
        }
        public async Task<int> SetupTestCareerLevel(string name = "Level") {
            return await SendAsync(new CreateCareerLevelCommand {
                Name = name,
                ShortName = name,
            });
        }
        public async Task<int> SetupTestMemberStatus(string name = "Status") {
            return await SendAsync(new CreateMemberStatusCommand {
                Name = name,
            });
        }
        public void VerifyStatusChanges(IList<PersonMemberStatusVm> actualList, IList<ExpectedMemberStatusChange> expectedList) {
            actualList.Should().HaveSameCount(expectedList);
            for (int i = 0;i < actualList.Count;i++) {
                var actual = actualList[i];
                var expected = expectedList[i];
                actual.MemberStatusName.Should().Be(expected.MemberStatusName, "status name missmatch at {0}", i);
                actual.BeginDateTime.Should().Be(expected.ChangeTime, "start time missmatch at {0}", i);
                if (i == actualList.Count - 1) {
                    actual.EndDateTime.Should().BeNull();
                } else {
                    actual.EndDateTime.Should().Be(expectedList[i + 1].ChangeTime, "end time missmatch at {0}", i);
                }
            }
        }
    }

    public class ExpectedMemberStatusChange {
        public string MemberStatusName;
        public DateTime ChangeTime;
    }
}
