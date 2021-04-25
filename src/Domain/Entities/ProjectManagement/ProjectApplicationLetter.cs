using MemberManager.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Domain.Entities.ProjectManagement
{
    public class ProjectApplicationLetter : ApplicationLetter
    {
        public int ProjectId { get; set; }

        public Project Project { get; set; }
    }
}
