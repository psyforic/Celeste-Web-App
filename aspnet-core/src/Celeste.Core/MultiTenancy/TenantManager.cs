using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.MultiTenancy;
using Abp.Runtime.Security;
using Abp.Runtime.Session;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;
using Celeste.Editions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Celeste.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public IAbpSession AbpSession { get; set; }
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAbpZeroDbMigrator _abpZeroDbMigrator;
        private readonly IWebHostEnvironment _environment;
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        public TenantManager(

            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore,
            IAbpZeroDbMigrator abpZeroDbMigrator,
            IPasswordHasher<User> passwordHasher,
            IWebHostEnvironment environment,
            UserManager userManager,
            IUnitOfWorkManager unitOfWorkManager,
            RoleManager roleManager) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
            _unitOfWorkManager = unitOfWorkManager;
            _passwordHasher = passwordHasher;
            _abpZeroDbMigrator = abpZeroDbMigrator;
            _environment = environment;
            _userManager = userManager;
            _roleManager= roleManager;


        }
        public async Task<int> CreateWithAdminUserAsync(string tenancyName,
            string name,
            string adminName,
            string adminSurname,
            string adminPassword,
            string adminEmailAddress,
            string connectionString,
            bool isActive)
        {

            int newTenantId;
            long newAdminId;

            using (var uow = _unitOfWorkManager.Begin(TransactionScopeOption.RequiresNew))
            {
                //Create tenant
                var tenant = new Tenant(tenancyName, name)
                {
                    Name = name,
                    IsActive = isActive,
                    ConnectionString = connectionString.IsNullOrWhiteSpace() ? null : SimpleStringCipher.Instance.Encrypt(connectionString)
                };

                await CreateAsync(tenant);
                await _unitOfWorkManager.Current.SaveChangesAsync(); //To get new tenant's id.

                //Create tenant database
                _abpZeroDbMigrator.CreateOrMigrateForTenant(tenant);

                //We are working entities of new tenant, so changing tenant filter
                using (_unitOfWorkManager.Current.SetTenantId(tenant.Id))
                {
                    //Create static roles for new tenant
                    CheckErrors(await _roleManager.CreateStaticRoles(tenant.Id));
                    await _unitOfWorkManager.Current.SaveChangesAsync();
                    //To get static role ids

                    //User role should be default
                    var userRole = _roleManager.Roles.Single(r => r.Name == StaticRoleNames.Tenants.Admin);
                    userRole.IsDefault = true;
                    CheckErrors(await _roleManager.UpdateAsync(userRole));
                    await _roleManager.GrantAllPermissionsAsync(userRole);
                    //Create admin user for the tenant
                    var adminUser = User.CreateTenantAdminUser(tenant.Id, adminEmailAddress,adminName,adminSurname);
                    //adminUser.ShouldChangePasswordOnNextLogin = shouldChangePasswordOnNextLogin;
                    adminUser.IsActive = true;

                    if (adminPassword.IsNullOrEmpty())
                    {
                        adminPassword = User.CreateRandomPassword();
                    }
                    else
                    {
                        await _userManager.InitializeOptionsAsync(AbpSession.TenantId);
                        foreach (var validator in _userManager.PasswordValidators)
                        {
                            CheckErrors(await validator.ValidateAsync(_userManager, adminUser, adminPassword));
                        }

                    }

                    adminUser.Password = _passwordHasher.HashPassword(adminUser, adminPassword);

                    CheckErrors(await _userManager.CreateAsync(adminUser));
                    await _unitOfWorkManager.Current.SaveChangesAsync(); //To get admin user's id

                    //Assign admin user to admin role!
                    CheckErrors(await _userManager.AddToRoleAsync(adminUser, userRole.Name));


        
                    await _unitOfWorkManager.Current.SaveChangesAsync();

                    newTenantId = tenant.Id;
                    newAdminId = adminUser.Id;
                    await uow.CompleteAsync();
                }
            }
            return newTenantId;
        }
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
   
}



