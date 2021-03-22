using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees
{
    public class CareerLevelDto : IMapFrom<CareerLevel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }

        public ICollection<CareerLevelAssignee> Assignees { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<CareerLevel, CareerLevelDto>()
                .ForMember(d => d.Assignees, opt =>
                    opt.MapFrom(pos => pos.PersonCareerLevels
                        .Select(pp => new CareerLevelAssignee {
                            FirstName = pp.Person.FirstName,
                            Surname = pp.Person.Surname,
                            Id = pp.Id,
                            BeginDateTime = pp.BeginDateTime,
                            EndDateTime = pp.EndDateTime,
                            PersonId = pp.Person.Id,
                        })));
        }
    }
}
