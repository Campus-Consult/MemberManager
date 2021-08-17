using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;
using MemberManager.Domain.Enums;

namespace MemberManager.Application.People.Commands.CreatePerson
{
    public class CreatePersonCommand : IRequest<int>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime Birthdate { get; set; }
        public Gender Gender { get; set; }
        public string EmailPrivate { get; set; }
        public string EmailAssociaton { get; set; }
        public string MobilePrivate { get; set; }
        public string AdressStreet { get; set; }
        public string AdressNo { get; set; }
        public string AdressZIP { get; set; }
        public string AdressCity { get; set; }
        // TODO: they are only made optional until the UI for this is changed
        public int? InitialCareerLevelId { get; set; }
        public int? InitialMemberStatusId { get; set; }
        public DateTime? JoinDate { get; set; }
    }

    public class CreatePersonCommandHandler : IRequestHandler<CreatePersonCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IDateTime _dateTimeService;

        public CreatePersonCommandHandler(IApplicationDbContext context, IDateTime dateTimeService)
        {
            _context = context;
            _dateTimeService = dateTimeService;
        }

        public async Task<int> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
        {
            var entity = new Person
            {
                FirstName = request.FirstName,
                Surname = request.Surname,
                Birthdate = request.Birthdate,
                Gender = request.Gender,
                EmailPrivate = request.EmailPrivate,
                EmailAssociaton = request.EmailAssociaton,
                MobilePrivate = request.MobilePrivate,
                AdressStreet = request.AdressStreet,
                AdressNo = request.AdressNo,
                AdressZIP = request.AdressZIP,
                AdressCity = request.AdressCity,
            };

            _context.People.Add(entity);

            var joinDateTime = request.JoinDate ?? _dateTimeService.Now;

            if (request.InitialMemberStatusId != null) {
                _context.PersonMemberStatus.Add(new PersonMemberStatus {
                    BeginDateTime = joinDateTime,
                    EndDateTime = null,
                    MemberStatusId = request.InitialMemberStatusId.Value,
                    Person = entity,
                });
            }

            if (request.InitialCareerLevelId != null) {
                _context.PersonCareerLevels.Add(new PersonCareerLevel {
                    BeginDateTime = joinDateTime,
                    EndDateTime = null,
                    CareerLevelId = request.InitialCareerLevelId.Value,
                    Person = entity,
                });
            }

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}