using Ctor.Application;
using Ctor.Infrastructure;
using Ctor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApiServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Initialise and seed database
    using (var scope = app.Services.CreateScope())
    {
        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();
        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();
    }
}
else
{
    app.UseHsts();
}

app.UseHealthChecks("/health");
app.UseHttpsRedirection();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        builder.Configuration["FilesFolder"] ?? "C:\\RadencyFiles"),
    RequestPath = "/files",
    OnPrepareResponse = ctx => {
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept");
    },
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program
{
}