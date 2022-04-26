using System;
using System.Collections.Generic;
using MemberManager.Domain.Enums;

namespace MemberManager.Domain.Entities
{
    public class EventAnswer
    {
        public int Id { get; set; }
        public EventAnswerKind AnswerKind { get; set; }
        public Event Event { get; set; }
        public Person Person { get; set; }
    }
}
