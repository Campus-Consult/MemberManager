using MemberManager.Application.MemberStatuss.Commands.ChangePersonMemberStatus;
using MemberManager.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using MemberManager.Domain.Enums;
using System.Collections.Generic;
using MemberManager.Application.People.Queries.GetPersonDetail;

namespace MemberManager.Application.IntegrationTests.MemberStatuss.Commands
{
    using static Testing;

    public class ChangePersonMemberStatusCommandTest : TestBase
    {
        [Test]
        public async Task CanChangeCareerLevelMultipleTimes() {
            var personId = await SetupTestPerson();
            var status1 = await SetupTestMemberStatus("1");
            var status2 = await SetupTestMemberStatus("2");
            var status3 = await SetupTestMemberStatus("3");

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status2,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status3,
                ChangeDateTime = new DateTime(2020,01,2),
                PersonId = personId,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            VerifyStatusChanges(personDetails.MemberStatus, new List<ExpectedMemberStatusChange> {
                new ExpectedMemberStatusChange {
                    MemberStatusName = "1",
                    ChangeTime = new DateTime(2020,01,01),
                },
                new ExpectedMemberStatusChange {
                    MemberStatusName = "3",
                    ChangeTime = new DateTime(2020,01,02),
                },
                new ExpectedMemberStatusChange {
                    MemberStatusName = "2",
                    ChangeTime = new DateTime(2020,01,05),
                },
            });
        }

        [Test]
        public async Task ChangingToCurrentFails() {
            var personId = await SetupTestPerson();
            var status1 = await SetupTestMemberStatus("1");
            var status2 = await SetupTestMemberStatus("2");
            var status3 = await SetupTestMemberStatus("3");

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            AssertValidationError(SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status1,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            }), "ChangeDateTime", "Person ist bereits diesem Member Status zugeordnet!");
        }

        [Test]
        public async Task SameCareerLevelChangesAreMerged() {
            var personId = await SetupTestPerson();
            var status1 = await SetupTestMemberStatus("1");
            var status2 = await SetupTestMemberStatus("2");
            var status3 = await SetupTestMemberStatus("3");

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status1,
                ChangeDateTime = new DateTime(2020,01,01),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status3,
                ChangeDateTime = new DateTime(2020,01,05),
                PersonId = personId,
            });

            await SendAsync(new ChangePersonMemberStatusCommand {
                MemberStatusId = status1,
                ChangeDateTime = new DateTime(2019,01,03),
                PersonId = personId,
            });

            var personDetails = await SendAsync(new GetPersonDetailQuery {
                Id = personId,
            });
            VerifyStatusChanges(personDetails.MemberStatus, new List<ExpectedMemberStatusChange> {
                new ExpectedMemberStatusChange {
                    MemberStatusName = "1",
                    ChangeTime = new DateTime(2019,01,03),
                },
                new ExpectedMemberStatusChange {
                    MemberStatusName = "3",
                    ChangeTime = new DateTime(2020,01,05),
                },
            });
        }
    }
}