using System;
using AutoMapper;
using MemberManager.Domain.Entities;
using MemberManager.Application.Common.Mappings;

namespace MemberManager.Application.Events.Common
{
    public class EventLookupDto : IMapFrom<Event> {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
