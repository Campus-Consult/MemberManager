using System;
using MemberManager.Domain.Entities;

namespace MemberManager.Application.People.Queries.GetPersonDetail
{
    public class PersonMemberStatusVm {
        public int Id { get; set; }
        public int MemberStatusId { get; set; }
        public string MemberStatusName { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public static PersonMemberStatusVm fromPersonMemberStatus(PersonMemberStatus pms) {
            return new PersonMemberStatusVm {
                BeginDateTime = pms.BeginDateTime,
                EndDateTime = pms.EndDateTime,
                Id = pms.Id,
                MemberStatusId = pms.MemberStatus.Id,
                MemberStatusName = pms.MemberStatus.Name,
            };
        }
    }
}