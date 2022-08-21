using System.Text;
using Ctor.Application.Common.Interfaces;
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
using Microsoft.IdentityModel.Tokens;

namespace Ctor.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
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

        services.AddScoped<IRepositoryFactory, RepositoryFactory>();
        services.AddScoped<IEntityRepository, EntityRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IBuildingRepository, BuildingRepository>();
        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IPhaseRepository, PhaseRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddTransient(typeof(Lazy<>), typeof(LazyInstance<>));
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ApplicationDbContextInitialiser>();

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddTransient<IPasswordService,PasswordService>();
        services.AddTransient<ISecurityService, SecurityService>();

        services.AddAuthentication(opt => {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://localhost:7271", // TODO: Move to config
                    ValidAudience = "https://localhost:7271",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")) // TODO: Move to config
                };
            });

        return services;
    }
}
