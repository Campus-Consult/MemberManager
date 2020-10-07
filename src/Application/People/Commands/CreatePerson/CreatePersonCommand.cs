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
    }

    public class CreateTodoItemCommandHandler : IRequestHandler<CreatePersonCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateTodoItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
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

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}