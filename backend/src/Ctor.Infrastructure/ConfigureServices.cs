using System.Text;
using Ctor.Application.Auth.Interfaces;
using Ctor.Application.Common.Interfaces;
using Ctor.Application.Common.Interfaces.Bus;
using Ctor.Application.Common.Models;
using Ctor.Domain.Repositories;
using Ctor.Infrastructure.Core;
using Ctor.Infrastructure.Persistence;
using Ctor.Infrastructure.Persistence.Repositories;
using Ctor.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Ctor.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("CtorDb"));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
                    builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.Configure<MailSetting>((mailSetting) => {
            mailSetting.ApiSecret = Environment.GetEnvironmentVariable("ApiSecret");
            mailSetting.ApiKey = Environment.GetEnvironmentVariable("ApiKey");
            mailSetting.FromEmail = Environment.GetEnvironmentVariable("FromEmail");
            mailSetting.DiplayName = Environment.GetEnvironmentVariable("DiplayName");
        });

        services.Configure<FileManipulatorSettings>((fileManipulatorSettings) =>
        {
            fileManipulatorSettings.FolderPath = configuration["FilesFolder"];
        });
        
        services.AddScoped<IRepositoryFactory, RepositoryFactory>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IBuildingRepository, BuildingRepository>();
        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IPhaseRepository, PhaseRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IProjectPhotoRepository, ProjectPhotoRepository>();
        services.AddScoped<ICompanyLogoRepository, CompanyLogoRepository>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ApplicationDbContextInitializer>();

        services.AddTransient(typeof(Lazy<>), typeof(LazyInstance<>));
        services.AddTransient<IDateTime, DateTimeService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddTransient<IPasswordService,PasswordService>();
        services.AddTransient<ISecurityService, SecurityService>();
        services.AddTransient<INumberGenerateService, NumberGenerateSercice>();
        services.AddSingleton<ITokenProvider, TokenProvider>();
        services.AddScoped<IUserManager, UserManager>();
        services.AddTransient<ICsvFileService, CsvFileService>();
        services.AddScoped<IFileManipulatorService, FileManipulatorService>();
        services.AddScoped<IAddressParsingService, AddressParsingService>();
        services.AddScoped<IGroupsService, GroupsService>();

        services.AddTransient<IEventBus, RabbitMqBus>(sp =>
        {
            IServiceScopeFactory scopeFactory = sp.GetRequiredService<IServiceScopeFactory>();
            MessageBrokerSettings settings = new(
                configuration["MessageBroker:HostName"],
                Convert.ToUInt16(configuration["MessageBroker:Port"]), 
                configuration["MessageBroker:UserName"],
                configuration["MessageBroker:Password"]);

            return new RabbitMqBus(scopeFactory, settings, sp.GetService<ILogger<RabbitMqBus>>());
        });

        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            var secret = configuration["Jwt:Secret"];
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
            };
        });

        return services;
    }
}