using AutoMapper;
using MediatR;
using MemberManager.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.CRM.Contacts.Queries.GetContactDetails
{
    public class GetContactDetailsQuery : IRequest<ContactDetailVm>
    {
        public int Id { get; set; }
    }

    public class GetPersonDetailQueryHandler : IRequestHandler<GetContactDetailsQuery, ContactDetailVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        private readonly ICRMService _crmService;

        public GetPersonDetailQueryHandler(IApplicationDbContext context, IMapper mapper, ICRMService crmService)
        {
            _context = context;
            _mapper = mapper;
            _crmService = crmService;
        }

        public async Task<ContactDetailVm> Handle(GetContactDetailsQuery request, CancellationToken cancellationToken)
        {
            return _mapper.Map<ContactDetailVm>(_crmService.GetContact(request.Id.ToString()));
        }
    }
}
