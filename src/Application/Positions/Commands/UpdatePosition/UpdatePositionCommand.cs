using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.UpdatePosition
{
    public class UpdatePositionCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
    }

    public class UpdatePositionCommandHandler : IRequestHandler<UpdatePositionCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdatePositionCommand request, CancellationToken cancellationToken)
        {
            var pos = await _context.Positions.FindAsync(request.Id);
            pos.Name = request.Name;
            pos.ShortName = request.ShortName;
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
