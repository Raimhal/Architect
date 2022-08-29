using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Ctor.Application.Companies.Queries.GetCompanyLogoByCompanyId;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace Ctor.IntegrationTests.CompanyControllerTests.GetTests;

public class GetCompanyLogoTest : GetFixture
{
    private readonly ITestOutputHelper _testOutputHelper;
    private HttpClient _client;

    public GetCompanyLogoTest(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public async Task Get_CompanyLogo_Check()
    {
        using TestingWebAppFactory<Program> factory = new TestingWebAppFactory<Program>();
        _client = factory.CreateClient();

        //Arrange

        const int companyId = 1;
        GetCompanyLogoByCompanyIdResponseDto expected = new() { Id = 1, Link = "companyLogos/name.png" };

        _testOutputHelper.WriteLine("1");

        //Action
        //Put photo for get
        await using (FileStream file = File.OpenRead("TestPhotos/dummy.png"))
        {
            using (StreamContent content = new(file))
            {
                using (MultipartFormDataContent formData = new())
                {
                    formData.Add(content, "data", "dummy.png");
                    await _client.PutAsync($"{_getApi}/{companyId}/logo", formData);
                }
            }
        }

        //Test
        HttpResponseMessage getResponse = await _client.GetAsync($"{_getApi}/{companyId}/logo");

        //Delete from disk
        HttpResponseMessage deleteResponse = await _client.DeleteAsync($"{_getApi}/{companyId}/logo");

        //Assertion
        getResponse.EnsureSuccessStatusCode();
        string responseString = await getResponse.Content.ReadAsStringAsync();
        GetCompanyLogoByCompanyIdResponseDto? actual =
            JsonConvert.DeserializeObject<GetCompanyLogoByCompanyIdResponseDto>(responseString);

        Assert.Equal(expected.Id, actual.Id);
        Assert.Equal(Path.GetExtension(expected.Link), Path.GetExtension(actual.Link));
    }
}