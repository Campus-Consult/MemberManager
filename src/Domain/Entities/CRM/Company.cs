using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Domain.Entities.CRM
{
    public class Company : Common
    {
        public String City { get; set; }
        public String Domain { get; set; }
        public String Industry { get; set; }
        public String Name { get; set; }
        public String Phone { get; set; }
        public String State { get; set; }
    }
}
