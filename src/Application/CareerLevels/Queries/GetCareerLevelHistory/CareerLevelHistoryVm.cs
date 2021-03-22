using System.Collections.Generic;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevelHistory
{
    public class CareerLevelHistoryVm
    {
        public ICollection<CareerLevelAssignee> Assignees { get; set; }
    }
}