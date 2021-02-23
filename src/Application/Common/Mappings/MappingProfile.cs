﻿using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace MemberManager.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        private readonly IServiceCollection _serviceCollection;

        public MappingProfile(IServiceCollection serviceCollection)
        {
            _serviceCollection = serviceCollection;

            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i => 
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                object instance = null;

                var constructors = type.GetConstructors();
                var firstConstrutor = constructors.FirstOrDefault(); // Bastard Injection DI anti-pattern
                if (firstConstrutor != null)
                {
                    var constructorParameters = firstConstrutor.GetParameters();
                    if (constructorParameters != null && constructorParameters.Any())
                    {
                        var objectList = new List<object>();

                        foreach (var constructorParameter in constructorParameters)
                        {
                            var cpType = constructorParameter.ParameterType;
                            var paramInstance = _serviceCollection.BuildServiceProvider().GetService(cpType);
                            objectList.Add(paramInstance);
                        }

                        instance = Activator.CreateInstance(type, objectList.ToArray());
                    }
                }

                if (instance == null)
                {
                    instance = Activator.CreateInstance(type);
                }

                var methodInfo = type.GetMethod("Mapping") 
                    ?? type.GetInterface("IMapFrom`1").GetMethod("Mapping");
                
                methodInfo?.Invoke(instance, new object[] { this });
            }
        }
    }
}