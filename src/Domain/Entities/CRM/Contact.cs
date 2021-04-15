using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Domain.Entities.CRM
{
    public class Contact : Common
    {
        // Properties
        public String Company { get; set; }
        public String Email { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Phone { get; set; }
        public String Website { get; set; }
    }
}
