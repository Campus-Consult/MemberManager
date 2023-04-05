using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MemberManager.Domain.Entities;
using MemberManager.Application.Common.Mappings;

namespace MemberManager.Application.Events.Common
{
    public class EventLookupDtoWithAnswerCount : IMapFrom<Event> {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public ICollection<string> Tags { get; set; }
        public int AnswerCount { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<Event, EventLookupDtoWithAnswerCount>()
                .ForMember(e => e.Tags, opt => opt.MapFrom(e => e.EventTags.Select(t => t.Tag).ToList()))
                .ForMember(e => e.AnswerCount, opt => opt.MapFrom(e => e.EventAnswers.Count()));
        } 
    }
}
