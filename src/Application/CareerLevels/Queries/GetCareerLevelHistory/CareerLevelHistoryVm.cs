using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;
using MemberManager.Application.Common.Mappings;
using MemberManager.Application.Common.Models;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelHistory
{
    public class CareerLevelHistoryVm : IMapFrom<CareerLevel>
    {
        public ICollection<AssigneeDto> Assignees { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CareerLevel, CareerLevelHistoryVm>()
                .ForMember(ms => ms.Assignees, opt => opt.MapFrom(s =>
                    s.PersonCareerLevels.Select(a =>
                        new AssigneeDto() { PersonId = a.PersonId, Name = a.Person.FirstName + " " + a.Person.Surname, BeginDateTime = a.BeginDateTime, EndDateTime = a.EndDateTime })
                    .OrderByDescending(a => a.BeginDateTime).ToList()));
        }
    }
}
