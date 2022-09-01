using Ctor.Application.Common.Events;

namespace Ctor.Application.Common.Interfaces.Bus;

public interface IEventBus
{
    void Publish<T>(T @event) where T : Event;

    void Subscribe<T, TH>()
        where T : Event
        where TH : IEventHandler<T>;
}