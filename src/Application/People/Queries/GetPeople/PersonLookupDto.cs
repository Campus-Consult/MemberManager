using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPeople
{
    public class PersonLookupDto : IMapFrom<Person>
    {
        public string Id { get; set; }
        public string FistName { get; set; }
        public string Surname { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Person, PersonLookupDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.FistName, opt => opt.MapFrom(s => s.FirstName))
                .ForMember(d => d.Surname, opt => opt.MapFrom(s => s.Surname));
        }
    }
}
