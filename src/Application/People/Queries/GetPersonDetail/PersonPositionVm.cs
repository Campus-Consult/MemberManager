using System;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPersonDetail
{
    public class PersonPositionVm {
        public int Id { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string PositionShortName { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public static PersonPositionVm fromPersonPosition(PersonPosition pp) {
            return new PersonPositionVm {
                BeginDateTime = pp.BeginDateTime,
                EndDateTime = pp.BeginDateTime,
                Id = pp.Id,
                PositionId = pp.Position.Id,
                PositionName = pp.Position.Name,
                PositionShortName = pp.Position.ShortName,
            };
        }
    }
}