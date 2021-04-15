using System;
using System.Collections.Generic;
using System.Text;

namespace MemberManager.Infrastructure.HubSpot.Api.Contacts
{
    public class ContactPropertiesDto
    {
        public DateTime createdate { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string hs_object_id { get; set; }
        public DateTime lastmodifieddate { get; set; }
        public string lastname { get; set; }
    }

    public class ContactDto
    {
        public string id { get; set; }
        public ContactPropertiesDto properties { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool archived { get; set; }
    }

}
