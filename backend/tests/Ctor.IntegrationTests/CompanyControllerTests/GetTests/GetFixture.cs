namespace Ctor.IntegrationTests.CompanyControllerTests.GetTests;

public class GetFixture : CompanyControllerFixture
{
    protected readonly string _getApi;
    public GetFixture()
    {
        _getApi = _COMPANY_CONTROLLER_API;
    }
}