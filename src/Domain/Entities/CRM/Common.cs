using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Domain.Entities.CRM
{
    public class Common
    {
        public String Id { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime ArchivedAt { get; set; }
        public Boolean Archived { get; set; }

        //public Object Associations { get; set; }
    }
}
