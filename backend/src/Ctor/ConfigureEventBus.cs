using Ctor.Application.BusEventHandlers.BusTestReceive;
using Ctor.Application.Common.Interfaces.Bus;

namespace Ctor;

public static class ConfigureEventBus
{
    public static void ConfigureBus(this IApplicationBuilder app)
    {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
            eventBus.Subscribe<BusTestReceiveEvent, BusTestReceiveEventHandler>();
        }
    }
}