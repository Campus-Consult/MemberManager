using System;
using AutoMapper;
using MemberManager.Domain.Entities;
using MemberManager.Application.Common.Mappings;
using MemberManager.Application.People.Queries.GetPeople;

namespace MemberManager.Application.Events.Common
{
    public class EventAnswerDto : IMapFrom<EventAnswer> {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public PersonLookupDto Person { get; set; }
    }
}
