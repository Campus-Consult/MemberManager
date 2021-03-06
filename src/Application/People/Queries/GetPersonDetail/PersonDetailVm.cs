﻿using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MemberManager.Application.People.Queries.GetPersonDetail
{
    public class PersonDetailVm : IMapFrom<Person>
    {
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
        public IList<PersonCareerLevelVm> CareerLevels { get; set; }
        public IList<PersonMemberStatusVm> MemberStatus { get; set; }
        public IList<PersonPositionVm> Positions { get; set; }
    }
}