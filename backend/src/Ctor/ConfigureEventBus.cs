using Ctor.Application.BusEventHandlers.BusTestReceive;
using Ctor.Application.Common.Interfaces.Bus;
using Ctor.Infrastructure.Services;

namespace Ctor;

public static class ConfigureEventBus
{
    public static void ConfigureBus(this IApplicationBuilder app)
    {
        var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
        eventBus.Subscribe<BusTestReceiveEvent, BusTestReceiveEventHandler>();
    }
}