﻿using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MemberManager.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MemberManager.Application.CareerLevels.Commands.UpdateCareerLevelCommand
{
    public class UpdateCareerLevelCommandValidator : AbstractValidator<UpdateCareerLevelCommand>
    {
        private IApplicationDbContext _context;
        public UpdateCareerLevelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(v => v.CareerLevelId)
                .NotEmpty()
                .MustAsync(CareerLevelExists).WithMessage("Karrierelevel existiert nicht!");
            RuleFor(v => v.Name)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(PositioNameUnique).WithMessage("Name des Karrierelevels wird bereits verwendet!");
            RuleFor(v => v.ShortName)
                .MaximumLength(200)
                .NotEmpty()
                .MustAsync(PositionShortNameUnique).WithMessage("Kurzbezeichnung des Karrierelevels wird bereits verwendet!");
        }

        public async Task<bool> CareerLevelExists(UpdateCareerLevelCommand model, int careerLevelId, CancellationToken cancellationToken) {
            return await _context.CareerLevels.FindAsync(careerLevelId) != null;
        }

        public async Task<bool> PositioNameUnique(UpdateCareerLevelCommand model, string name, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.Name != name || c.Id == model.CareerLevelId, cancellationToken);
        }

        public async Task<bool> PositionShortNameUnique(UpdateCareerLevelCommand model, string shortName, CancellationToken cancellationToken) {
            return await _context.CareerLevels.AllAsync(c => c.ShortName != shortName || c.Id == model.CareerLevelId, cancellationToken);
        }
    }
}
