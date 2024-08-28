/*
using Umbraco.Cms.Core.Composing;
using SerilogTracing.Expressions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WRA.Umbraco.Composers;

public class TracingComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ActivityListenerConfiguration>(sp =>
        {
            return new ActivityListenerConfiguration();
        });

        builder.Services.AddHostedService<ActivityListenerService>();
    }
}

public class ActivityListenerService(ActivityListenerConfiguration listenerConfiguration, ILogger logger) : IHostedService
{
    private readonly ActivityListenerConfiguration _listenerConfiguration = listenerConfiguration;
    private readonly ILogger _logger = logger;
    private IDisposable? _listener;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _listener = _listenerConfiguration.TraceTo(_logger);
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _listener?.Dispose();
        return Task.CompletedTask;
    }
}
*/