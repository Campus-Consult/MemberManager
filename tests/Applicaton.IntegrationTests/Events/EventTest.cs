using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.Events.Commands.CreateEvent;
using MemberManager.Application.Events.Queries.GetEventDetails;
using MemberManager.Application.Events.Commands.UpdateEvent;
using MemberManager.Application.Events.Common;
using MemberManager.Application.Events.Commands.DeleteEvent;
using MemberManager.Application.Events.Queries.GetAllEvents;

namespace MemberManager.Application.IntegrationTests.Events
{
    using static Testing;

    public class EventsTest : TestBase
    {

        public async Task<int> SetupTestEvent(string organizerEmail, string name = "TestEvent") {
            return await SendAsync(new CreateEventCommand {
                Tags = new List<string>(),
                Name = name,
                Start = new DateTime(2020,01,01),
                End = new DateTime(2020,01,02),
                OrganizerEmail = organizerEmail,
            });
        }

        public async Task<EventDetailDto> GetEventDetail(int eventId) {
            return await SendAsync(new GetEventDetailsQuery {
                EventId = eventId,
            });
        }

        public async Task<List<EventLookupDto>> GetAllEvents() {
            return await SendAsync(new GetAllEventsQuery());
        }

        [Test]
        public async Task CanCreateAndGetEvent() {
            var eventName = "Test Event";
            var startTime = new DateTime(2020,01,01);
            var endTime = new DateTime(2020,01,02);
            var organizerEmail = "test@campus-consult.org";
            var organizerId = await SetupTestPerson(organizerEmail);
            var eventId = await SendAsync(new CreateEventCommand {
                Tags = new List<string>(),
                Name = eventName,
                Start = startTime,
                End = endTime,
                OrganizerEmail = organizerEmail,
            });

            var createdEvent = await GetEventDetail(eventId);

            createdEvent.Should().NotBeNull();
            createdEvent.Tags.Should().HaveCount(0);
            createdEvent.Name.Should().Be(eventName);
            createdEvent.Start.Should().Be(startTime);
            createdEvent.End.Should().Be(endTime);
            // TODO: id is not a string...
            createdEvent.Organizer.Id.Should().Be(organizerId);

        }

        [Test]
        public async Task CanCreateAndEditEvent() {
            var organizerEmail = "test@campus-consult.org";
            var organizerId = await SetupTestPerson(organizerEmail);
            var eventId = await SetupTestEvent(organizerEmail);

            var newStart = new DateTime(2022, 1, 2);
            var newEnd = new DateTime(2022, 1, 3);
            var newName = "New Name";

            await SendAsync(new UpdateEventCommand {
                Id = eventId,
                Name = newName,
                Start = newStart,
                End = newEnd,
                Tags = null,
            });

            var allEvents = await GetAllEvents();
            allEvents.Should().HaveCount(1);

            var updatedEvent = await GetEventDetail(eventId);

            updatedEvent.Should().NotBeNull();
            updatedEvent.Tags.Should().HaveCount(0);
            updatedEvent.Name.Should().Be(newName);
            updatedEvent.Start.Should().Be(newStart);
            updatedEvent.End.Should().Be(newEnd);
            // TODO: id is not a string...
            updatedEvent.Organizer.Id.Should().Be(organizerId);

        }

        [Test]
        public async Task CanCreateAndDeleteEvent() {
            var organizerEmail = "test@campus-consult.org";
            var organizerId = await SetupTestPerson(organizerEmail);
            var eventId = await SetupTestEvent(organizerEmail);

            await SendAsync(new DeleteEventCommand {
                Id = eventId,
            });

            var deletedEvent = await GetEventDetail(eventId);

            deletedEvent.Should().BeNull();
            
            var allEvents = await GetAllEvents();

            allEvents.Should().HaveCount(0);
        }

        [Test]
        public async Task ValidatesCreation() {
            var validStart = new DateTime(2020, 1, 1);
            var validEnd = new DateTime(2020, 1, 2);
            AssertValidationError(SendAsync(new CreateEventCommand {
                Tags = null,
                Name = "Test",
                OrganizerEmail = "h",
                Start = validStart,
                End = validEnd,
            }), "OrganizerEmail", "Organizer does not exist.");

            var organizerEmail = "test@campus-consult.org";
            await SetupTestPerson(organizerEmail);

            AssertValidationError(SendAsync(new CreateEventCommand {
                Tags = null,
                Name = "Test",
                OrganizerEmail = organizerEmail,
                Start = validStart,
                End = new DateTime(2018, 1, 1),
            }), "Start", "Start has to be before End");

            AssertValidationError(SendAsync(new CreateEventCommand {
                Tags = null,
                Name = null,
                OrganizerEmail = organizerEmail,
                Start = validStart,
                End = validEnd,
            }), "Name", "'Name' darf nicht leer sein.");
        }
    }
}
