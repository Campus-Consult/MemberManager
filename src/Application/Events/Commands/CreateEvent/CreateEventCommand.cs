using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.CreateEvent
{
    public class CreateEventCommand : IRequest<int>
    {
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string OrganizerEmail { get; set; }
    }

    public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateEventCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var origanizer = await _context.People.Where(p => p.EmailAssociaton == request.OrganizerEmail).FirstOrDefaultAsync();
            var bytes = RandomNumberGenerator.GetBytes(16);
            var secretKey = Convert.ToHexString(bytes);

            var evnt = new Event()
            {
                Name = request.Name,
                Organizer = origanizer,
                Start = request.Start,
                End = request.End,
                SecretKey = secretKey,
            };

            _context.Events.Add(evnt);

            await _context.SaveChangesAsync(cancellationToken);

            return evnt.Id;
        }
    }
}
