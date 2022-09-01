using Bogus;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ctor.Infrastructure.Persistence;

public class ApplicationDbContextInitializer
{
    private readonly ILogger<ApplicationDbContextInitializer> _logger;
    private readonly ApplicationDbContext _context;
    private readonly INumberGenerateService _numberGenerateService;
    private readonly Faker _faker;

    private readonly Role _adminRole =
        new() { Name = "Admin", Type = UserRoles.Admin };

    private readonly Role _operationalManagerRole =
        new() { Name = "Operational manager", Type = UserRoles.OperationalManager };

    private readonly Role _projectManagerRole =
        new() { Name = "Project manager", Type = UserRoles.ProjectManager };

    private readonly Role _mainEngineerRole =
        new() { Name = "Main engineer", Type = UserRoles.MainEngineer };

    private readonly Role _foremanRole =
        new() { Name = "Foreman", Type = UserRoles.Foreman };

    public ApplicationDbContextInitializer(
        ILogger<ApplicationDbContextInitializer> logger,
        ApplicationDbContext context,
        INumberGenerateService numberGenerateService)
    {
        _logger = logger;
        _context = context;
        _numberGenerateService = numberGenerateService;

        _faker = new Faker
        {
            Random = new Randomizer(123), //
        };
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsNpgsql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initializing the database");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await SeedInternalAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database");
            throw;
        }
    }

    private async Task SeedInternalAsync()
    {
        if (_context.Roles.Any() || _context.Companies.Any())
        {
            return;
        }

        await _context.Roles.AddRangeAsync(_adminRole, _operationalManagerRole,
            _projectManagerRole, _mainEngineerRole, _foremanRole);

        await _context.Users.AddRangeAsync(
            new User
            {
                FirstName = "admin",
                LastName = "admin",
                UserEmail = "admin@radency.com",
                Password = "12345",
                AskToChangeDefaultPassword = false,
                Role = _adminRole,
                CompanyId = null,
            });

        await _context.Companies.AddRangeAsync(GenerateCompanies());

        await _context.SaveChangesAsync();
    }

    private ICollection<Company> GenerateCompanies()
    {
        return Enumerable.Range(0, 4)
            .Select(i =>
            {
                var users = GenerateUsers(((char)('a' + i)).ToString());

                return new Company
                {
                    CompanyId = _faker.Random.Long(),
                    CompanyName = _faker.Company.CompanyName(),
                    Description = _faker.Company.CatchPhrase(),
                    Country = _faker.Address.County(),
                    City = _faker.Address.City(),
                    Address = _faker.Address.StreetAddress(),
                    Email = _faker.Internet.Email(),
                    JoinDate = _faker.Date.Past(yearsToGoBack: 5).ToUniversalTime(),
                    Website = _faker.Internet.DomainName(),
                    Users = users,
                    Projects = GenerateProjects(users.First()),
                };
            })
            .ToArray();
    }

    private ICollection<User> GenerateUsers(string emailNameSuffix)
    {
        return Enumerable.Range(1, 4)
            .Select(i => new User
            {
                FirstName = _faker.Name.FirstName(),
                LastName = _faker.Name.LastName(),
                UserEmail = $"{i}{emailNameSuffix}@radency.com",
                Password = "12345",
                Role = i switch
                {
                    1 => _operationalManagerRole,
                    2 => _projectManagerRole,
                    3 => _mainEngineerRole,
                    4 => _foremanRole,
                    _ => throw new ArgumentOutOfRangeException(nameof(i)),
                },
            })
            .ToArray();
    }

    private record ProjectSeed(string ProjectName, string ProjectType);

    private readonly ICollection<ProjectSeed> _projects = new ProjectSeed[]
    {
        new("Leessas Town", "Roads"), //
        new("Stoagem Valley", "Park"), //
        new("Rufus Street", "Housing District"), //
        new("Cliftonville", "Mansion"), //
        new("Plotezalf Center", "Shopping Centre"), //
        new("Wistful Vista", "Recreation Complex"), //
        new("Upper South Xorisk", "Housing District"), //
        new("Ropewalks", "Roads"), //
    };

    private ICollection<Project> GenerateProjects(User owner)
    {
        var status = _faker.Random.Enum<ProjectStatus>();

        var endTime = status is ProjectStatus.Finished
            ? _faker.Date.Past(yearsToGoBack: 4)
            : _faker.Date.Future(yearsToGoForward: 4);

        return Enumerable.Range(0, _faker.Random.Int(1, 3))
            .Select(_ =>
            {
                var project = _faker.Random.CollectionItem(_projects);

                return new Project
                {
                    ProjectId = _numberGenerateService.GetRandomNumberForId(),
                    ProjectName = project.ProjectName,
                    ProjectType = project.ProjectType,
                    Country = _faker.Address.Country(),
                    City = _faker.Address.City(),
                    Address = _faker.Address.StreetAddress(),
                    Budget = _faker.Random.Long(1_000, 1_000_000_000),
                    Status = status,
                    StartTime = _faker.Date.Past(yearsToGoBack: 5).ToUniversalTime(),
                    EndTime = endTime.ToUniversalTime(),
                    User = owner,
                    Building = GenerateBuildings(),
                    Phases = GeneratePhases(),
                };
            })
            .ToArray();
    }

    private record BuildingSeed(string BuildingName);

    private ICollection<BuildingSeed> _buildings = new BuildingSeed[]
    {
        new("First floor"),
        new("Parking"),
        new("Park"),
        new("Second floor"),
    };

    private ICollection<Building> GenerateBuildings()
    {
        return Enumerable.Range(0, _faker.Random.Int(1, 3))
            .Select(_ => {
                var building = _faker.Random.CollectionItem(_buildings);

                return new Building
                {
                    BuildingName = building.BuildingName,
                };
            })
            .ToArray();
    }

    private ICollection<Phase> GeneratePhases()
    {
        return Enumerable.Range(0, 5)
            .Select(phaseStep => new Phase
            {
                PhaseName = phaseStep switch
                {
                    0 => "Planning",
                    1 => "Pre-construction",
                    2 => "Procurement",
                    3 => "Construction",
                    4 => "Post-construction",
                    _ => throw new ArgumentOutOfRangeException(nameof(phaseStep)),
                },
                StartTime = _faker.Date.Past(yearsToGoBack: 5).ToUniversalTime(),
                EndTime = _faker.Date.Past(yearsToGoBack: 5).ToUniversalTime(),
                PhaseStep = phaseStep,
            })
            .ToArray();
    }
}