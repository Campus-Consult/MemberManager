using MemberManager.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class Person
    {
        public Person()
        {
            PersonCareerLevels = new HashSet<PersonCareerLevel>();
            PersonMemberStatus = new HashSet<PersonMemberStatus>();
            PersonPositions = new HashSet<PersonPosition>();
        }

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

        public ICollection<PersonCareerLevel> PersonCareerLevels { get; private set; }
        public ICollection<PersonMemberStatus> PersonMemberStatus { get; private set; }
        public ICollection<PersonPosition> PersonPositions { get; private set; }
    }
}
