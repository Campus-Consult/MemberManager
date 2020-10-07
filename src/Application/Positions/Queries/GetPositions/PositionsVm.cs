using System.Collections.Generic;

namespace MemberManager.Application.Positions.Queries.GetPositions
{
    public class PositionsVm
    {
        public ICollection<PositionLookupDto> Positions { get; set; }
    }
}