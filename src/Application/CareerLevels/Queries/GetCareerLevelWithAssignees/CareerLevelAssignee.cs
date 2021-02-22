using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees
{
    public class CareerLevelAssignee : IMapFrom<PersonCareerLevel>{
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<PersonCareerLevel, CareerLevelAssignee>()
                .ForMember(c => c.FirstName, opt => opt.MapFrom(pc => pc.Person.FirstName))
                .ForMember(c => c.Surname, opt => opt.MapFrom(pc => pc.Person.Surname));
        }
    }
}