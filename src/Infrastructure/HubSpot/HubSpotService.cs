using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities.CRM;
using MemberManager.Infrastructure.HubSpot.Api.Contacts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace MemberManager.Infrastructure.HubSpot
{
    public class HubSpotService : ICRMService
    {
        private readonly IConfiguration _configuration;
        private readonly IContactsService _contactsService;

        public HubSpotService(IConfiguration configuration)
        {
            _configuration = configuration;
            _contactsService = new ContactsService(_configuration["HubSpot:ApiKey"]);
        }

        public ICollection<Company> GetCompanies()
        {
            throw new NotImplementedException();
        }

        public Company GetCompany(string id)
        {
            throw new NotImplementedException();
        }

        public Contact GetContact(string id)
        {
            ContactDto contactDto = _contactsService.Read(id);
            return new Contact
            {
                Id = contactDto.id,
                Archived = contactDto.archived,
                FirstName = contactDto.properties.firstname,
                LastName = contactDto.properties.lastname,
                Email = contactDto.properties.email
            };
        }

        public ICollection<Contact> GetContacts()
        {
            throw new NotImplementedException();
        }

        public Deal GetDeal(string id)
        {
            throw new NotImplementedException();
        }

        public ICollection<Deal> GetDeals()
        {
            throw new NotImplementedException();
        }
    }
}
