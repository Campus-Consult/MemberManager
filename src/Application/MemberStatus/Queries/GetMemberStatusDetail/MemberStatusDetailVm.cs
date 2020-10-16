using AutoMapper;
using MemberManager.Application.Common.Interfaces;
using System.Linq;

namespace MemberManager.Application.MemberStatus.Queries.GetMemberStatusDetail
{
    public class MemberStatusDetailVm
    {
        private readonly IDateTime _dateTime;
        public MemberStatusDetailVm(IDateTime dateTime)
        {
            _dateTime = dateTime;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
        public bool CountAssignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MemberStatus, MemberStatusDetailVm>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => (int)s.PersonMemberStatus.Where(x => x.EndDateTime <= _dateTime.Now && x.BeginDateTime >= _dateTime.Now).Count()));
        }
    }
}