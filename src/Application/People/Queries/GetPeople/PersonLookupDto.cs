using AutoMapper;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPeople
{
    public class PersonLookupDto : IMapFrom<Person>
    {
        public int Id { get; set; }
        public string EmailAssociaton { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
    }
}
