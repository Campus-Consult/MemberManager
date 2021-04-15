using MemberManager.Domain.Entities.CRM;
using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Infrastructure.HubSpot.Api.Contacts
{
    public interface IContactsService
    {
        public ContactDto Read(String id);
    }

    public class ContactsListParams
    {
        public int? Limit { get; set; } 
        public String After { get; set; }
        public String[] Properties { get; set; }
        public String[] Associations { get; set; }
        public Boolean? Archieved { get; set; }
    }
}
