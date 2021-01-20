using AutoMapper;
using MemberManager.Application.Common.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatusDetail
{
    public class MemberStatusDetailVm : IMapFrom<Domain.Entities.MemberStatus>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountAssignees { get; set; }
        public ICollection<AssigneeDTO> Assignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MemberStatus, MemberStatusDetailVm>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => s.PersonMemberStatus.Where(x => (x.EndDateTime == null || x.EndDateTime >= DateTime.Now) && x.BeginDateTime <= DateTime.Now).Count()))
                .ForMember(ms => ms.Assignees, opt => opt.MapFrom(s => s.PersonMemberStatus.Where(x => (x.EndDateTime == null || x.EndDateTime >= DateTime.Now) && x.BeginDateTime <= DateTime.Now).Select(a => new AssigneeDTO() { PersonId = a.PersonId, Name = a.Person.FirstName + " " + a.Person.Surname, BeginDateTime = a.BeginDateTime, EndDateTime = a.EndDateTime }).ToList()));
        }
    }

    public class AssigneeDTO
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}