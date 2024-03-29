﻿using AutoMapper;
using MemberManager.Application.Common.Mappings;
using System;
using System.Linq;

namespace MemberManager.Application.MemberStatuss.Queries.GetMemberStatus
{
    public class MemberStatusLookupDto : IMapFrom<Domain.Entities.MemberStatus>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountAssignees { get; set; }

        public void Mapping(Profile profile)
        {
            DateTime? dateTimeNow = null;
            profile.CreateMap<Domain.Entities.MemberStatus, MemberStatusLookupDto>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => s.PersonMemberStatus.Where(x => (x.EndDateTime == null || x.EndDateTime >= dateTimeNow) && x.BeginDateTime <= dateTimeNow).Count()));
        }
    }
}