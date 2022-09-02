using System.Text;
using Ctor.Application.Common.Events;
using Ctor.Application.Common.Interfaces.Bus;
using Ctor.Application.Common.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Ctor.Infrastructure.Services;

public class TestBus : IEventBus
{
    public void Publish<T>(T @event) where T : Event
    {
        throw new NotImplementedException();
    }

    public void Subscribe<T, TH>()
        where T : Event
        where TH : IEventHandler<T>
    {
        throw new NotImplementedException();
    }
}