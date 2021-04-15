using MemberManager.Domain.Entities.CRM;
using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Application.Common.Interfaces
{
    public interface ICRMService
    {
        // Contacts
        public ICollection<Contact> GetContacts();
        public Contact GetContact(String id);

        // Companies
        public ICollection<Company> GetCompanies();
        public Company GetCompany(String id);

        // Deals
        public ICollection<Deal> GetDeals();
        public Deal GetDeal(String id);
    }
}
