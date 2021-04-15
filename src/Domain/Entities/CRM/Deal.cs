using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Domain.Entities.CRM
{
    public class Deal : Common
    {
        // Properties
        public String Amount { get; set; }
        public String Dealname { get; set; }
        public String Dealstage { get; set; }
        public String HubspotOwnerId { get; set; }
        public String Pipeline { get; set; }
        public DateTime CloseDate { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
