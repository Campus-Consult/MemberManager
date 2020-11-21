﻿using AutoMapper;
using System.Collections.Generic;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPeopleBasicInfo
{
    public class PersonBasicInfoLookupDto
    {
        public int Id { get; set; }
        public string FistName { get; set; }
        public string Surname { get; set; }

        public IList<string> CurrentPositions { get; set; }

        public string CurrentCareerLevel { get; set; }

        public string CurrentMemberStatus { get; set; }
    }
}