using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPeopleWithBasicInfo
{
    public class SimplePositionDto : IMapFrom<Position> {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
    }
}