using AutoMapper;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System.Linq;

namespace MemberManager.Application.Positions.Queries.GetPositions
{
    public class PositionLookupDto : IMapFrom<Position>
    {
        private readonly IDateTime _dateTime;

        public PositionLookupDto(IDateTime dateTime)
        {
            _dateTime = dateTime;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
        public int CountAssignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Position, PositionLookupDto>()
                .ForMember(d => d.CountAssignees, opt => opt.MapFrom(s => s.PersonPositions.Where(x => (x.EndDateTime == null || x.EndDateTime >= _dateTime.Now) && x.BeginDateTime <= _dateTime.Now).Count()));
        }
    }
}
