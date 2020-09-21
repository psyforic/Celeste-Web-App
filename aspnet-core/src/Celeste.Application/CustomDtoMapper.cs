using AutoMapper;
using Celeste.Modes;
using Celeste.Modes.Dto;
using Celeste.UserModes;
using Celeste.UserModes.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste
{
    internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //Mode 
            configuration.CreateMap<Mode, ModeListDto>();
            configuration.CreateMap<ModeListDto, Mode>();

            configuration.CreateMap<Mode, CreateModeInput>();
            configuration.CreateMap<CreateModeInput, Mode>();

            // UserModes

            configuration.CreateMap<UserMode, UserModeListDto>();
            configuration.CreateMap<UserModeListDto, UserMode>();

            configuration.CreateMap<UserModeListDto, UserMode>();
            configuration.CreateMap<UserMode, UserModeListDto>();
        }
    }
}
