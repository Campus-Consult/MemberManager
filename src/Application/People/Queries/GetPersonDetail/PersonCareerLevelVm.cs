using System;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPersonDetail
{
    public class PersonCareerLevelVm {
        public int Id { get; set; }
        public int CareerLevelId { get; set; }
        public string CareerLevelName { get; set; }
        public string CareerLevelShortName { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public static PersonCareerLevelVm fromPersonCareerLevel(PersonCareerLevel pcl) {
            return new PersonCareerLevelVm {
                BeginDateTime = pcl.BeginDateTime,
                CareerLevelId = pcl.CareerLevel.Id,
                CareerLevelName = pcl.CareerLevel.Name,
                CareerLevelShortName = pcl.CareerLevel.ShortName,
                EndDateTime = pcl.EndDateTime,
                Id = pcl.Id,
            };
        }
    }
}