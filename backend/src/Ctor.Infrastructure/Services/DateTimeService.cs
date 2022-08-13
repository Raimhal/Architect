using Ctor.Application.Common.Interfaces;

namespace Ctor.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
