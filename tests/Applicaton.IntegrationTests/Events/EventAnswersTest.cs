using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.Events.Commands.CreateEvent;
using MemberManager.Application.Events.Queries.GetEventDetails;
using MemberManager.Application.Events.Common;
using MemberManager.Application.Events.Commands.AttendEvent;
using MemberManager.Application.Events.Queries.GetOwnEvents;

namespace MemberManager.Application.IntegrationTests.Events
{
    using static Testing;

    public class EventAnswersTest : TestBase
    {
        private static readonly string testuserMail = "testing@campus-consult.org";
        private static readonly string testuserPassword = "asdfASD1!";
        private static readonly DateTime eventStartTime = new DateTime(2020,01,01);
        private static readonly DateTime validTime = eventStartTime.AddHours(1);
        private static readonly DateTime eventEndTime = new DateTime(2020,01,03);
        private int testPersonId;
        private int eventId;
        private string secretKey;

        public async Task<int> SetupTestEvent() {
            var organizerEmail = "test@campus-consult.org";
            await SetupTestPerson(organizerEmail);
            return await SendAsync(new CreateEventCommand {
                Tags = new List<string>(),
                Name = "TestEvent",
                Start = eventStartTime,
                End = eventEndTime,
                OrganizerEmail = organizerEmail,
            });
        }

        public async Task DoSetup() {
            testPersonId = await SetupTestPerson(testuserMail);
            await Testing.RunAsUserAsync(testuserMail, testuserPassword);
            Testing.SetDateTime(validTime);
            eventId = await SetupTestEvent();
            secretKey = await GetSecretKey(eventId);
        }

        public Task<EventDetailDto> GetEventDetails(int eventId) {
            return SendAsync(new GetEventDetailsQuery{
                EventId = eventId
            });
        }

        public async Task<string> GetSecretKey(int eventId) {
            return (await GetEventDetails(eventId)).SecretKey;
        }

        [Test]
        public async Task CanAttendEventOnce() {
            await DoSetup();
            await SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = secretKey,
            });
            // check that it worked
            var eventDetails = await GetEventDetails(eventId);
            eventDetails.EventAnswers.Should().HaveCount(1);
            eventDetails.EventAnswers[0].Time.Should().Be(validTime);
            eventDetails.EventAnswers[0].Person.Should().NotBeNull();
            eventDetails.EventAnswers[0].Person.Id.Should().Be(testPersonId);
            // silently doesn't record the second time
            Testing.SetDateTime(validTime.AddHours(1));
            await SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = secretKey,
            });
            // should stay the same still
            eventDetails = await GetEventDetails(eventId);
            eventDetails.EventAnswers.Should().HaveCount(1);
            eventDetails.EventAnswers[0].Time.Should().Be(validTime);
            eventDetails.EventAnswers[0].Person.Should().NotBeNull();
            eventDetails.EventAnswers[0].Person.Id.Should().Be(testPersonId);
        }

        [Test]
        public async Task RejectInvalidKey() {
            await DoSetup();
            AssertValidationError(SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = "wrong!",
            }), "EventSecretKey", "Event not found or bad key");
            // check that it didn't work
            var eventDetails = await GetEventDetails(eventId);
            eventDetails.EventAnswers.Should().HaveCount(0);
        }

        [Test]
        public async Task RejectNonexistingEvent() {
            await DoSetup();
            AssertValidationError(SendAsync(new AttendEventCommand {
                EventId = -2,
                EventSecretKey = "wrong!",
            }), "EventSecretKey", "Event not found or bad key");
            // check that it didn't work
            var eventDetails = await GetEventDetails(eventId);
            eventDetails.EventAnswers.Should().HaveCount(0);
        }

        [Test]
        public async Task RejectOutOfTimerange() {
            await DoSetup();
            Testing.SetDateTime(eventStartTime.AddHours(-1));
            AssertValidationError(SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = secretKey,
            }), "EventSecretKey", "Event is not active!");
            // check that timerange is checked last
            AssertValidationError(SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = "invalid!",
            }), "EventSecretKey", "Event not found or bad key");
            // check that it didn't work
            var eventDetails = await GetEventDetails(eventId);
            eventDetails.EventAnswers.Should().HaveCount(0);
        }

        [Test]
        public async Task AttendeeCanSeeTheirOwn() {
            await DoSetup();
            var eventAnswers = await SendAsync(new GetOwnEventsQuery {});
            eventAnswers.Should().HaveCount(0);
            await SendAsync(new AttendEventCommand {
                EventId = eventId,
                EventSecretKey = secretKey,
            });
            eventAnswers = await SendAsync(new GetOwnEventsQuery {});
            eventAnswers.Should().HaveCount(1);
            eventAnswers[0].Event.Should().NotBeNull();
            eventAnswers[0].Event.Name.Should().Be("TestEvent");
            eventAnswers[0].Time.Should().Be(validTime);
        }
    }
}
