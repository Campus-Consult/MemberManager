using Microsoft.Extensions.Configuration;
using RestSharp;
using System;

namespace MemberManager.Infrastructure.HubSpot.Api.Contacts
{
    public class ContactsService : IContactsService
    {
        private static readonly String apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";

        private readonly String apiKey;

        public ContactsService(string apiKey)
        {
            this.apiKey = apiKey;
        }

        public ContactDto Read(String id)
        {
            var client = new RestClient($"{apiUrl}/{id}?archived=false&hapikey={apiKey}");
            var request = new RestRequest(Method.GET);
            request.AddHeader("accept", "application/json");
            IRestResponse<ContactDto> response = client.Execute<ContactDto>(request);

            return response.Data;
        }
    }
}
