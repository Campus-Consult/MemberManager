using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevels
{
    public class CareerLevelLookupDto : IMapFrom<CareerLevel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
    }
}
