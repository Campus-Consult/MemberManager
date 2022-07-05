using System;
using System.Collections.Generic;
using System.Linq;
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
        public ICollection<string> Tags { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<Event, EventLookupDto>()
                .ForMember(e => e.Tags, opt => opt.MapFrom(e => e.EventTags.Select(t => t.Tag).ToList()));
        } 
    }
}
