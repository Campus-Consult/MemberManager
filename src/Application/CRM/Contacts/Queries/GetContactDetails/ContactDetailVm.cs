using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities.CRM;
using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Application.CRM.Contacts.Queries.GetContactDetails
{
    public class ContactDetailVm : IMapFrom<Contact>
    {
        public String Id { get; set; }
        public Boolean Archived { get; set; }

        // Properties
        public String Company { get; set; }
        public String Email { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
