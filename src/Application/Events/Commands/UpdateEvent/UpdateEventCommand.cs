using MediatR;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Events.Commands.UpdateEvent
{
    public class UpdateEventCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string OrganizerEmail { get; set; }
        public List<string> Tags { get; set; }
    }

    public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateEventCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var origanizer = await _context.People.Where(p => p.EmailAssociaton == request.OrganizerEmail).FirstOrDefaultAsync();

            var evnt = await _context.Events.FindAsync(new object [] {request.Id}, cancellationToken);
            
            evnt.Name = request.Name;
            evnt.Organizer = origanizer;
            evnt.End = request.End;
            evnt.Start = request.Start;

            // delete existing tags
            _context.EventTags.RemoveRange(_context.EventTags.Where(et => et.EventId == evnt.Id));
            // create the new tags
            if (request.Tags != null) {
                foreach (var tag in request.Tags.Distinct()) {
                    _context.EventTags.Add(new EventTag() {
                        EventId = evnt.Id,
                        Tag = tag,
                    });
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
