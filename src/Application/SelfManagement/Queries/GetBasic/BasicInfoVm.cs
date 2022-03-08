using System;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;

namespace MemberManager.Application.SelfManagement.Queries.GetBasic
{
    public class BasicInfoVm : IMapFrom<Person> {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime Birthdate { get; set; }
        public Gender Gender { get; set; }
        public string EmailPrivate { get; set; }
        public string EmailAssociaton { get; set; }
        public string MobilePrivate { get; set; }
        public string AdressStreet { get; set; }
        public string AdressNo { get; set; }
        public string AdressZIP { get; set; }
        public string AdressCity { get; set; }
    }
}
