using AutoMapper;
using System.Collections.Generic;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPeopleWithBasicInfo
{
    public class PersonWithBasicInfoLookupDto
    {
        public int Id { get; set; }
        public string FistName { get; set; }
        public string Surname { get; set; }

        public IList<SimplePositionDto> CurrentPositions { get; set; }

        public string CurrentCareerLevel { get; set; }

        public string CurrentCareerLevelShort{get; set;}

        public string CurrentMemberStatus { get; set; }
    }
}
