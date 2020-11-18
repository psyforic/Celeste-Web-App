using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.UI;
using Celeste.Authorization;
using Celeste.Authorization.Accounts;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;
using Celeste.Modes.UserModes;
using Celeste.MultiTenancy;
using Celeste.Roles.Dto;
using Celeste.UserModes;
using Celeste.Users.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Celeste.Users
{
    //  [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : AsyncCrudAppService<User, UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly UserModesManager _userModesManager;
        private readonly IRepository<UserMode, Guid> _userModesRepository;
        private readonly IRepository<Role> _roleRepository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAbpSession _abpSession;
        private readonly LogInManager _logInManager;
        private readonly IWebHostEnvironment _environment;
        private readonly IRepository<Tenant> _tenantRepository;

        public UserAppService(
            IRepository<User, long> repository,
            UserManager userManager,
            RoleManager roleManager,
            UserModesManager userModesManager,
        IRepository<Role> roleRepository,
            IPasswordHasher<User> passwordHasher,
            IAbpSession abpSession,
            IRepository<Tenant> tenantRepository,
        IWebHostEnvironment environment,
        IRepository<UserMode, Guid> userModesRepository,
            LogInManager logInManager)
            : base(repository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _userRepository = repository;
            _passwordHasher = passwordHasher;
            _abpSession = abpSession;
            _logInManager = logInManager;
            _environment = environment;
            _userModesManager = userModesManager;
            _tenantRepository = tenantRepository;
            _userModesRepository = userModesRepository;
        }

        public override async Task<UserDto> CreateAsync(CreateUserDto input)
        {
            CheckCreatePermission();

            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.IsEmailConfirmed = true;
            var tenant = await _tenantRepository.FirstOrDefaultAsync(user.TenantId.Value);
            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            CheckErrors(await _userManager.CreateAsync(user,user.Password));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }
            CurrentUnitOfWork.SaveChanges();

            //send an email here
            string body = string.Empty;

            //using streamreader for reading my html template   

            var path = Path.Combine(_environment.WebRootPath, "EmailTemplate/send-invite.html");

            using (StreamReader reader = new StreamReader(path))
            {
                body = reader.ReadToEnd();
            }

            string link = "http://localhost:4200/";
            body = body.Replace("#Name", input.Name + " " + input.Surname);
            body = body.Replace("#Link", link);
            if (tenant != null)
                body = body.Replace("#Domain", tenant.TenancyName);
            body = body.Replace("#Password", user.Password);
            body = body.Replace("#Username", input.UserName);
            Emailer.Send(to: input.EmailAddress, subject: "Celeste New Account!", body: body, isBodyHtml: true);

            return MapToEntityDto(user);
        }
        public async override Task<UserDto> GetAsync(EntityDto<long> input)
        {

            var user = await _userRepository.GetAll().Include(x => x.Roles)
            .Include(x => x.UserModes).ThenInclude(x => x.Mode).FirstOrDefaultAsync(x => x.Id == input.Id);
            var mappedUser = MapToEntityDto(user);
            return mappedUser;


        }
        public override async Task<UserDto> UpdateAsync(UserDto input)
        {
            CheckUpdatePermission();
            var user = await _userManager.GetUserByIdAsync(input.Id);
            if (user != null)
            {             

                ObjectMapper.Map(input, user);
                user.UserModes = null;
                CheckErrors(await _userManager.UpdateAsync(user));
                await CurrentUnitOfWork.SaveChangesAsync();
                if (user.Id > 0)
                {

                    if (input.UserModes != null && input.UserModes.Count > 0)
                    {
                        foreach (var mode in input.UserModes)
                        {
                            if (await _userModesRepository.FirstOrDefaultAsync(x => x.Id.Equals(mode.Id)) == null)
                            {
                                var mappedMode = ObjectMapper.Map<UserMode>(mode);
                                mappedMode.UserId = user.Id;
                                await _userModesManager.CreateAsync(mappedMode);
                            }
                        }
                    }

                    var userModes = await _userModesRepository.GetAll().Where(X => X.UserId == user.Id).Select(x => x.Id).ToListAsync();
                    if (userModes.Count > 0)
                    {
                        foreach (var userMode in userModes)
                        {
                            if (!input.UserModes.Any(x => x.Id.Equals(userMode)))
                            {
                                await _userModesRepository.HardDeleteAsync(x =>x.Id.Equals(userMode));
                            }
                        }
                    }
                }

                if (input.RoleNames != null)
                {
                    CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
                }
                return ObjectMapper.Map<UserDto>(user);
            }
            throw new UserFriendlyException("User Not Found");
            
        }

        public override async Task DeleteAsync(EntityDto<long> input)
        {
            var user = await _userManager.GetUserByIdAsync(input.Id);
            await _userManager.DeleteAsync(user);
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }

        public async Task ChangeLanguage(ChangeUserLanguageDto input)
        {
            await SettingManager.ChangeSettingForUserAsync(
                AbpSession.ToUserIdentifier(),
                LocalizationSettingNames.DefaultLanguage,
                input.LanguageName
            );
        }

        protected override User MapToEntity(CreateUserDto createInput)
        {
            var user = ObjectMapper.Map<User>(createInput);
            user.SetNormalizedNames();
            return user;
        }

        protected override void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }

        protected override UserDto MapToEntityDto(User user)
        {
            var roleIds = user.Roles.Select(x => x.RoleId).ToArray();

            var roles = _roleManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName);

            var userDto = base.MapToEntityDto(user);
            userDto.RoleNames = roles.ToArray();

            return userDto;
        }
        public async Task<ListResultDto<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllIncluding(m => m.UserModes).ToListAsync();
            return new ListResultDto<UserDto>(ObjectMapper.Map<List<UserDto>>(users));
        }

        protected override IQueryable<User> CreateFilteredQuery(PagedUserResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Roles)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.UserName.Contains(input.Keyword) || x.Name.Contains(input.Keyword) || x.EmailAddress.Contains(input.Keyword))
                .WhereIf(input.IsActive.HasValue, x => x.IsActive == input.IsActive);
        }

        public async Task<UpdateUserDto> UpdateUser(long id, UpdateUserDto input)
        {
            var user = await _userRepository.FirstOrDefaultAsync(id);
            if (user != null)
            {
                ObjectMapper.Map(input, user);
                user.Id = id;
                await _userRepository.UpdateAsync(user);
                return ObjectMapper.Map<UpdateUserDto>(user);
            }
            return null;
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            var user = await Repository.GetAllIncluding(x => x.Roles).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                throw new EntityNotFoundException(typeof(User), id);
            }

            return user;
        }

        protected override IQueryable<User> ApplySorting(IQueryable<User> query, PagedUserResultRequestDto input)
        {
            return query.OrderBy(r => r.UserName);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

        public async Task<bool> ChangePassword(ChangePasswordDto input)
        {
            if (_abpSession.UserId == null)
            {
                throw new UserFriendlyException("Please log in before attemping to change password.");
            }
            long userId = _abpSession.UserId.Value;
            var user = await _userManager.GetUserByIdAsync(userId);
            var loginAsync = await _logInManager.LoginAsync(user.UserName, input.CurrentPassword, shouldLockout: false);
            if (loginAsync.Result != AbpLoginResultType.Success)
            {
                throw new UserFriendlyException("Your 'Existing Password' did not match the one on record.  Please try again or contact an administrator for assistance in resetting your password.");
            }
            if (!new Regex(AccountAppService.PasswordRegex).IsMatch(input.NewPassword))
            {
                throw new UserFriendlyException("Passwords must be at least 8 characters, contain a lowercase, uppercase, and number.");
            }
            user.Password = _passwordHasher.HashPassword(user, input.NewPassword);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public async Task<ListResultDto<UserDto>> GetUserModes()
        {
            var users = await _userRepository.GetAll()
                .Include(x => x.UserModes)
                .ToListAsync();
            return new ListResultDto<UserDto>(ObjectMapper.Map<List<UserDto>>(users));
        }
        public async Task<UserDto> GetUserandModes(long id)
        {
            var user = await _userRepository.GetAll()
                .Where(x => x.Id == id)
                .Include(x => x.UserModes)
                .FirstOrDefaultAsync();

            return ObjectMapper.Map<UserDto>(user);
        }

        public async Task<bool> ResetPassword(ResetPasswordDto input)
        {
            if (_abpSession.UserId == null)
            {
                throw new UserFriendlyException("Please log in before attemping to reset password.");
            }
            long currentUserId = _abpSession.UserId.Value;
            var currentUser = await _userManager.GetUserByIdAsync(currentUserId);
            var loginAsync = await _logInManager.LoginAsync(currentUser.UserName, input.AdminPassword, shouldLockout: false);
            if (loginAsync.Result != AbpLoginResultType.Success)
            {
                throw new UserFriendlyException("Your 'Admin Password' did not match the one on record.  Please try again.");
            }
            if (currentUser.IsDeleted || !currentUser.IsActive)
            {
                return false;
            }
            var roles = await _userManager.GetRolesAsync(currentUser);
            if (!roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                throw new UserFriendlyException("Only administrators may reset passwords.");

            }

            var user = await _userManager.GetUserByIdAsync(input.UserId);
            if (user != null)
            {
                user.Password = _passwordHasher.HashPassword(user, input.NewPassword);
                CurrentUnitOfWork.SaveChanges();
            }

            return true;
        }
    }
}

