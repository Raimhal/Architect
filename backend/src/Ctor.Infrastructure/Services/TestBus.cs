using Ctor.Application.Common.Events;
using Ctor.Application.Common.Interfaces.Bus;

namespace Ctor.Infrastructure.Services;

public class TestBus : IEventBus
{
    public async Task Publish<T>(T @event, CancellationToken cancellationToken = default) where T : Event
    {
        throw new NotImplementedException();
    }

    public async Task Subscribe<T, TH>(CancellationToken cancellationToken = default) where T : Event where TH : IEventHandler<T>
    {
        throw new NotImplementedException();
    }
}