using MemberManager.Application.CareerLevels.Commands.CreateCareerLevelCommand;
using MemberManager.Application.People.Commands.CreatePerson;
using MemberManager.Application.Positions.Commands.CreatePosition;
using MemberManager.Domain.Enums;
using NUnit.Framework;
using System;
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
    }
}
