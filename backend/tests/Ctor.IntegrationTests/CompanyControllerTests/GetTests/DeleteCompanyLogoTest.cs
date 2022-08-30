using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Ctor.Application.Companies.Commands.DeleteCompanyLogo;
using FluentAssertions;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace Ctor.IntegrationTests.CompanyControllerTests.GetTests;

public class DeleteCompanyLogoTest : GetFixture
{
    private readonly ITestOutputHelper _testOutputHelper;
    private HttpClient _client;

    public DeleteCompanyLogoTest(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public async Task Delete_CompanyLogo_Check()
    {
        using TestingWebAppFactory<Program> factory = new TestingWebAppFactory<Program>();
        _client = factory.CreateClient();

        //Arrange
        const int companyId = 1;
        DeleteCompanyLogoResponseDto expected = new() { Id = 1, CompanyId = companyId };


        //Action
        //Put photo for delete
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
        HttpResponseMessage deleteResponse = await _client.DeleteAsync($"{_getApi}/{companyId}/logo");

        //Assertion
        deleteResponse.EnsureSuccessStatusCode();
        string responseString = await deleteResponse.Content.ReadAsStringAsync();
        DeleteCompanyLogoResponseDto? actual =
            JsonConvert.DeserializeObject<DeleteCompanyLogoResponseDto>(responseString);

        expected.Should().BeEquivalentTo(actual);
    }
}