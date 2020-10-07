using MemberManager.Application.Common.Interfaces;
using System;

namespace MemberManager.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
