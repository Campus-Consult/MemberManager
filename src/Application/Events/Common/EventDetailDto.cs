using System;
using System.Collections.Generic;
using AutoMapper;
using MemberManager.Domain.Entities;
using MemberManager.Application.Common.Mappings;
using MemberManager.Application.People.Queries.GetPeople;

namespace MemberManager.Application.Events.Common
{
    public class EventDetailDto : IMapFrom<Event> {

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string SecretKey { get; set; }
        public PersonLookupDto Organizer { get; set; }
        public ICollection<EventAnswerDto> EventAnswers { get; set; }
    }
}
