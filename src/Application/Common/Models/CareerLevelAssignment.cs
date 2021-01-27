using AutoMapper;
using AutoMapper.QueryableExtensions;
using MemberManager.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemberManager.Application.Common.Mappings;
using MemberManager.Domain.Entities;
using System;

namespace MemberManager.Application.Models
{
    public class CareerLevelAssignmentDto {
        public int PersonCareerLevelId { get; set; }
        public int CareerLevelId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }

    public static class CareerLevelAssignmentDtoExtenions {
        public static CareerLevelAssignmentDto ToCareerLevelAssignmentDto(this PersonCareerLevel careerLevel) {
            return new CareerLevelAssignmentDto {
                BeginDateTime = careerLevel.BeginDateTime,
                CareerLevelId = careerLevel.CareerLevel.Id,
                EndDateTime = careerLevel.EndDateTime,
                IsActive = careerLevel.CareerLevel.IsActive,
                Name = careerLevel.CareerLevel.Name,
                ShortName = careerLevel.CareerLevel.ShortName,
            };
        }
    }
}