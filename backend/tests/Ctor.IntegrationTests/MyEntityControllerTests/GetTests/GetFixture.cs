using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ctor.IntegrationTests.MyEntityControllerTests.GetTests;
public class GetFixture: MyEntityControllerFixture
{
    protected readonly string _getApi;
    public GetFixture()
    {
        _getApi = _MY_ENTITY_CONTROLLER_API;
    }
}
