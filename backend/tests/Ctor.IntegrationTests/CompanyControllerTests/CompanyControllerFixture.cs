using Xunit;

namespace Ctor.IntegrationTests.CompanyControllerTests;

public class CompanyControllerFixture : IClassFixture<TestingWebAppFactory<Program>>
{
    protected const string _COMPANY_CONTROLLER_API = "/api/Companies";
}