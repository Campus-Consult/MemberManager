using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using FluentValidation.Validators;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.SelfManagement.Commands.UpdateSelf
{
    public class UpdateSelfCommandValidator : AbstractValidator<UpdateSelfCommand>
    {
        private readonly IApplicationDbContext _context;
        public UpdateSelfCommandValidator(IApplicationDbContext context) 
        {
            _context = context;

            RuleFor(c => c.Email)
                .NotEmpty()
                .Equal(c => c.UpdateCommand.EmailAssociaton).WithMessage("EMailAssociation geändert!")
                .MustAsync(PersonIdMatches).WithMessage("ID geändert");
        }

        public async Task<bool> PersonIdMatches(UpdateSelfCommand command, string email, CancellationToken token) {
            var foundPerson = await _context.People.Where(p => p.EmailAssociaton == email).FirstOrDefaultAsync();
            if (foundPerson == null) {
                return false;
            } else {
                return foundPerson.Id == command.UpdateCommand.Id;
            }
        }
    }
}
