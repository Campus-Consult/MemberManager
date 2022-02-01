using System;
using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetBirthdayPeople
{
    public class PersonWithBirthdateDto : IMapFrom<Person>
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime Birthdate { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Person, PersonWithBirthdateDto>();
        }
    }
}
