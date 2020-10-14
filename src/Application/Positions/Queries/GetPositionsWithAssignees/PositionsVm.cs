using System.Collections.Generic;

namespace MemberManager.Application.Positions.Queries.GetPositionsWithAssignees
{
    public class PositionsWAVm
    {
        public ICollection<PositionDto> Positions { get; set; }
    }
}