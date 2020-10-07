using MediatR;
using MemberManager.Application.Common.Exceptions;
using MemberManager.Application.Common.Interfaces;
using MemberManager.Domain.Entities;
using MemberManager.Domain.Enums;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MemberManager.Application.People.Commands.UpdatePerson
{
    public class UpdatePersonCommand : IRequest
    {
        public int Id { get; set; }
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
    }

    public class UpdatePersonCommandHandler : IRequestHandler<UpdatePersonCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePersonCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.People.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Person), request.Id);
            }

            entity.FirstName = request.FirstName;
            entity.Surname = request.Surname;
            entity.Birthdate = request.Birthdate;
            entity.Gender = request.Gender;
            entity.EmailPrivate = request.EmailPrivate;
            entity.EmailAssociaton = request.EmailAssociaton;
            entity.MobilePrivate = request.MobilePrivate;
            entity.AdressStreet = request.AdressStreet;
            entity.AdressNo = request.AdressNo;
            entity.AdressZIP = request.AdressZIP;
            entity.AdressCity = request.AdressCity;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
