using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.CareerLevels.Queries.GetCareerLevelWithAssignees;

namespace MemberManager.Application.Administration.Queries.GetCurrentAdministrators
{
    public class GetCurrentAdministratorsQuery : IRequest<List<string>>
    {
    }

    public class GetCurrentAdministratorsQueryHandler : IRequestHandler<GetCurrentAdministratorsQuery, List<string>>
    {
        private readonly IIdentityService _identityService;

        public GetCurrentAdministratorsQueryHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<List<string>> Handle(GetCurrentAdministratorsQuery request, CancellationToken cancellationToken)
        {
            return await _identityService.GetUserMailsForRole("Admin");
        }
    }
}
