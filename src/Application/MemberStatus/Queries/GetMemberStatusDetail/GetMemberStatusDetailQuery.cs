﻿using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.MemberStatuss.Queries.GetMemberStatusDetail
{
    public class GetMemberStatusDetailQuery : IRequest<MemberStatusDetailVm>
    {
        public int Id { get; set; }
    }

    public class GetMemberStatusDetailQueryHandler : IRequestHandler<GetMemberStatusDetailQuery, MemberStatusDetailVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMemberStatusDetailQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberStatusDetailVm> Handle(GetMemberStatusDetailQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.MemberStatus
                .Include(ms => ms.PersonMemberStatus)
                .ThenInclude(pms => pms.Person)
                .FirstAsync(ms => ms.Id == request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(MemberStatus), request.Id);
            }

            return _mapper.Map<MemberStatusDetailVm>(entity);
        }
    }
}
