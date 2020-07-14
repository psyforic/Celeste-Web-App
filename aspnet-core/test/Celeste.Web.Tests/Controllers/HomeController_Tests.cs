using System.Threading.Tasks;
using Celeste.Models.TokenAuth;
using Celeste.Web.Controllers;
using Shouldly;
using Xunit;

namespace Celeste.Web.Tests.Controllers
{
    public class HomeController_Tests: CelesteWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}