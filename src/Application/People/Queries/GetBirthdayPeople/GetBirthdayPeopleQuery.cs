using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Models;
using System;
using System.Collections.Generic;

namespace MemberManager.Application.People.Queries.GetBirthdayPeople
{
    public class GetBirthdayPeopleQuery : IRequest<BirthdayPeopleDto>
    {
        public DateTime? Time { get; set; }
    }

    public class GetBirthdayPeopleQueryHandler : IRequestHandler<GetBirthdayPeopleQuery, BirthdayPeopleDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IDateTime _dateTimeService;

        public GetBirthdayPeopleQueryHandler(IApplicationDbContext context, IMapper mapper, IDateTime dateTimeService)
        {
            _context = context;
            _mapper = mapper;
            _dateTimeService = dateTimeService;
        }

        public static bool CheckDayDistance(int dayOfYear1, int dayOfYear2, int diff) {
            int dist = Math.Abs(dayOfYear1 - dayOfYear2);
            return dist < 14 || dist > 365 - 14;
        }

        public Task<BirthdayPeopleDto> Handle(GetBirthdayPeopleQuery request, CancellationToken cancellationToken)
        {
            // fun with leapyears
            // solution: pretend they don't exist
            var nowDoY = (request.Time ?? _dateTimeService.Now).DayOfYear;
            var birthdays = _context.People
                .AsEnumerable()
                .Where(p => CheckDayDistance(p.Birthdate.DayOfYear, nowDoY, 14))
                .OrderBy(p => p.Birthdate.DayOfYear)
                .Select(p => _mapper.Map<PersonWithBirthdateDto>(p))
                .ToList();
            
            return Task.FromResult(new BirthdayPeopleDto {
                People = birthdays
            });
        }
    }
}
