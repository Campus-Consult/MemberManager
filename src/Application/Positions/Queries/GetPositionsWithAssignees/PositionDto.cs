using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MemberManager.Application.Positions.Queries.GetPositionsWithAssignees
{
    public class PositionDto : IMapFrom<Position>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }

        public ICollection<PositionAssignee> Assignees { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<Position, PositionDto>()
                .ForMember(d => d.Assignees, opt =>
                    opt.MapFrom(pos => pos.PersonPositions
                        .Select(pp => new PositionAssignee {
                            FirstName = pp.Person.FirstName,
                            Id = pp.Id,
                            Surname = pp.Person.Surname,
                            PersonId = pp.Person.Id,
                            BeginDateTime = pp.BeginDateTime,
                            EndDateTime = pp.EndDateTime,
                        })));
        }
    }
}
