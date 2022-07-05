using System;
using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class EventTag
    {
        public EventTag() {}

        public int EventId { get; set; }
        public Event Event { get; set; }
        public string Tag { get; set; }
    }
}
