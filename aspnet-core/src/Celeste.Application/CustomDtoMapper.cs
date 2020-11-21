using AutoMapper;
using Celeste.Authorization.Users;
using Celeste.Modes;
using Celeste.Modes.Dto;
using Celeste.Tickets;
using Celeste.UserModes;
using Celeste.UserModes.Dto;
using Celeste.Users.Dto;
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

            configuration.CreateMap<Mode, GetModeOutput>();
            configuration.CreateMap<GetModeOutput, Mode>();

            configuration.CreateMap<GetModeOutput, Mode>();
            configuration.CreateMap<Mode, GetModeOutput>();

            // UserModes

            configuration.CreateMap<UserMode, UserModeListDto>();
            configuration.CreateMap<UserModeListDto, UserMode>();

            configuration.CreateMap<UserModeListDto, UserMode>();
            configuration.CreateMap<UserMode, UserModeListDto>();

            // User 
            configuration.CreateMap<UpdateUserDto, User>();
            configuration.CreateMap<User, UpdateUserDto>();

            configuration.CreateMap<User, UpdateUserDto>();
            configuration.CreateMap<UpdateUserDto, User>();

            // Tickets
            configuration.CreateMap<CreateTicketInput, Ticket>();
            configuration.CreateMap<Ticket, TicketDto>();
            configuration.CreateMap<Ticket, TicketListDto>();
            // Ticket Replies
            configuration.CreateMap<CreateTicketReplyInput, TicketReply>();
            configuration.CreateMap<TicketReply, TicketReplyDto>();
            configuration.CreateMap<TicketReply, TicketReplyListDto>();
            configuration.CreateMap<TicketReplyListDto, TicketReply>();
        }
    }
}
