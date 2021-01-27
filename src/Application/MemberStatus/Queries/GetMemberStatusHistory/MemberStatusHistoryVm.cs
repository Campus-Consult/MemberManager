using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatusHistory
{
    public class MemberStatusHistoryVm : IMapFrom<Domain.Entities.MemberStatus>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<AssigneeDto> Assignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MemberStatus, MemberStatusHistoryVm>()
                .ForMember(ms => ms.Assignees, opt => opt.MapFrom(s => s.PersonMemberStatus.Select(a => new AssigneeDto() { PersonId = a.PersonId, Name = a.Person.FirstName + " " + a.Person.Surname, BeginDateTime = a.BeginDateTime, EndDateTime = a.EndDateTime }).OrderByDescending(a => a.BeginDateTime).ToList()));
        }
    }
}
