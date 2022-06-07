using System;
using System.Linq;
using AutoMapper;
using MemberManager.Domain.Entities;
using MemberManager.Application.Common.Mappings;
using MemberManager.Application.People.Queries.GetPeople;

namespace MemberManager.Application.Events.Common
{
    public class EventAnswerWithEventDto : IMapFrom<EventAnswer> {
        public DateTime Time { get; set; }
        public EventLookupDto Event { get; set; }
    }
}
