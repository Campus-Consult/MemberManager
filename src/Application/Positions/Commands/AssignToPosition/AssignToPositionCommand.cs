﻿using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.Positions.Commands.AssignToPosition
{
    public class AssignToPositionCommand : IRequest<int>
    {
        public int PositionId { get; set; }
        public int PersonId { get; set; }
        public DateTime AssignmentDateTime { get; set; }
        public DateTime? DismissalDateTime { get; set; }
    }

    public class AssignToPositionCommandHandler : IRequestHandler<AssignToPositionCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public AssignToPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AssignToPositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Positions.FindAsync(request.PositionId);

            if(entity == null)
            {
                throw new NotFoundException(nameof(Position));
            }

            var newPersonPosition = new PersonPosition()
            {
                PositionId = request.PositionId,
                PersonId = request.PersonId,
                BeginDateTime = request.AssignmentDateTime,
                EndDateTime = request.DismissalDateTime,
            };

            entity.PersonPositions.Add(newPersonPosition);

            await _context.SaveChangesAsync(cancellationToken);

            return newPersonPosition.Id;
        }
    }
}
