using Ctor.Application.Common.Events;

namespace Ctor.Application.BusEventHandlers.BusTestReceive;

public class BusTestReceiveEvent : Event
{
    public BusTestReceiveEvent(string message)
    {
        Message = message;
    }

    public string Message { get; private set; }
}