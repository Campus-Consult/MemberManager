using System.Collections.Generic;

namespace MemberManager.Application.CareerLevels.Queries.GetCareerLevels
{
    public class CareerLevelsVm
    {
        public ICollection<CareerLevelLookupDto> CareerLevels { get; set; }
    }
}