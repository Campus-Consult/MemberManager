using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System;
using System.Linq;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevels
{
    public class CareerLevelLookupDto : IMapFrom<CareerLevel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
        public int CountAssignees { get; set; }

        public void Mapping(Profile profile)
        {
            DateTime? dateTimeNow = null;
            profile.CreateMap<CareerLevel, CareerLevelLookupDto>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => s.PersonCareerLevels.Where(x => (x.EndDateTime == null || x.EndDateTime >= dateTimeNow) && x.BeginDateTime <= dateTimeNow).Count()));
        }
    }
}
