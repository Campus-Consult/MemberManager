using AutoMapper;
using System;
using System.Linq;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatusDetail
{
    public class MemberStatusDetailVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool CountAssignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MemberStatus, MemberStatusDetailVm>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => s.PersonMemberStatus.Where(x => (x.EndDateTime == null || x.EndDateTime >= DateTime.Now) && x.BeginDateTime <= DateTime.Now).Count()));
        }
    }
}