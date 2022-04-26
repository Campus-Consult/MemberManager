using System;
using System.Collections.Generic;

namespace MemberManager.Domain.Entities
{
    public class Event
    {
        public Event()
        {
            EventAnswers = new HashSet<EventAnswer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string SecretKey { get; set; }
        public Person Organizer { get; set; }

        public ICollection<EventAnswer> EventAnswers { get; private set; }


    }
}
