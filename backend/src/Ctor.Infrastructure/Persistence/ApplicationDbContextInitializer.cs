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

        if (!_context.Measurements.Any())
        {
            await _context.Measurements.AddRangeAsync(
               new Measurement
               {
                   Id = 1,
                   Name = "Item"
               }, new Measurement
               {
                   Id = 2,
                   Name = "Kilo"
               }, new Measurement
               {
                   Id = 3,
                   Name = "Foot"
               }, new Measurement
               {
                   Id = 4,
                   Name = "Tons"
               });
        }
        if (!_context.MaterialType.Any())
        {
            await _context.MaterialType.AddRangeAsync(
               new MaterialType
               {
                   Id = 1,
                   Name = "Mud bricks",
               },
               new MaterialType
               {
                   Id = 2,
                   Name = "Facing bricks",
               }, new MaterialType
               {
                   Id = 3,
                   Name = "Extruded bricks",
               }, new MaterialType
               {
                   Id = 4,
                   Name = "Engineering bricks",
               }, new MaterialType
               {
                   Id = 5,
                   Name = "Common bricks",
               }, new MaterialType
               {
                   Id = 6,
                   Name = "Mud bricks",
               }, new MaterialType
               {
                   Id = 7,
                   Name = "OPC",
               }, new MaterialType
               {
                   Id = 8,
                   Name = "PPC",
               }, new MaterialType
               {
                   Id = 9,
                   Name = "White cement",
               }, new MaterialType
               {
                   Id = 10,
                   Name = "Colored cement",
               }, new MaterialType
               {
                   Id = 11,
                   Name = "Hydrographic cement",
               }, new MaterialType
               {
                   Id = 12,
                   Name = "High-alumina cement",
               }, new MaterialType
               {
                   Id = 13,
                   Name = "Portland slag cement",
               }, new MaterialType
               {
                   Id = 14,
                   Name = "Float glass",
               },
               new MaterialType
               {
                   Id = 15,
                   Name = "Shatterproof glass",
               }, new MaterialType
               {
                   Id = 16,
                   Name = "Laminated glass",
               }, new MaterialType
               {
                   Id = 17,
                   Name = "Extra clean glass",
               }, new MaterialType
               {
                   Id = 18,
                   Name = "Chromatic glass",
               }, new MaterialType
               {
                   Id = 19,
                   Name = "Tinted glass",
               }, new MaterialType
               {
                   Id = 20,
                   Name = "Toughened glass",
               }, new MaterialType
               {
                   Id = 21,
                   Name = "Glass blocks",
               }, new MaterialType
               {
                   Id = 22,
                   Name = "Glass wool",
               }, new MaterialType
               {
                   Id = 23,
                   Name = "Insulated glazed units",
               }, new MaterialType
               {
                   Id = 24,
                   Name = "River sand",
               },
               new MaterialType
               {
                   Id = 25,
                   Name = "Concrete sand",
               }, new MaterialType
               {
                   Id = 26,
                   Name = "Coarse sand",
               }, new MaterialType
               {
                   Id = 27,
                   Name = "Utility sand",
               }, new MaterialType
               {
                   Id = 28,
                   Name = "Pit sand",
               }, new MaterialType
               {
                   Id = 29,
                   Name = "Fine sand",
               }, new MaterialType
               {
                   Id = 30,
                   Name = "Fill sand",
               }, new MaterialType
               {
                   Id = 31,
                   Name = "Desert sand",
               }, new MaterialType
               {
                   Id = 32,
                   Name = "Beach sand",
               }, new MaterialType
               {
                   Id = 33,
                   Name = "Marine sand",
               }, new MaterialType
               {
                   Id = 34,
                   Name = "Basalt",
               }, new MaterialType
               {
                   Id = 35,
                   Name = "Granite",
               }, new MaterialType
               {
                   Id = 36,
                   Name = "Sandstone",
               }, new MaterialType
               {
                   Id = 37,
                   Name = "Slate",
               },
               new MaterialType
               {
                   Id = 38,
                   Name = "Limestone",
               }, new MaterialType
               {
                   Id = 39,
                   Name = "Laterite",
               }, new MaterialType
               {
                   Id = 40,
                   Name = "Marble",
               }, new MaterialType
               {
                   Id = 41,
                   Name = "Gneiss",
               }, new MaterialType
               {
                   Id = 42,
                   Name = "Quartzite",
               }, new MaterialType
               {
                   Id = 43,
                   Name = "Travertine",
               }, new MaterialType
               {
                   Id = 44,
                   Name = "Pinewood",
               }, new MaterialType
               {
                   Id = 45,
                   Name = "Cedarwood",
               }, new MaterialType
               {
                   Id = 46,
                   Name = "Firwood",
               }
               , new MaterialType
               {
                   Id = 47,
                   Name = "Hemlock timber",
               }, new MaterialType
               {
                   Id = 48,
                   Name = "Teak wood",
               },
               new MaterialType
               {
                   Id = 49,
                   Name = "Oakwood",
               }, new MaterialType
               {
                   Id = 50,
                   Name = "Maple wood",
               }, new MaterialType
               {
                   Id = 51,
                   Name = "Cherry wood",
               }, new MaterialType
               {
                   Id = 52,
                   Name = "Walnut wood",
               }, new MaterialType
               {
                   Id = 53,
                   Name = "Beechwood",
               }, new MaterialType
               {
                   Id = 54,
                   Name = "Mahogany",
               }, new MaterialType
               {
                   Id = 55,
                   Name = "Sal wood",
               }, new MaterialType
               {
                   Id = 56,
                   Name = "Plywood",
               });

        }

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
                    Projects = GenerateProjects(users.First(u => u.Role.Type == UserRoles.OperationalManager)),
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
                PhoneNumber = _faker.Phone.PhoneNumber("+380 9# ### ## ##"),
                Password = "12345",
                Role = i switch
                {
                    1 => _operationalManagerRole,
                    2 => _projectManagerRole,
                    3 => _mainEngineerRole,
                    4 => _foremanRole,
                    _ => throw new ArgumentOutOfRangeException(nameof(i), i, null)
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
        return Enumerable.Range(0, _faker.Random.Int(1, 3))
            .Select(_ =>
            {
                var project = _faker.Random.CollectionItem(_projects);
                var phases = GeneratePhases();

                var status = phases.All(p => p.EndTime <= DateTime.UtcNow)
                    ? ProjectStatus.Finished
                    : phases.All(p => p.StartTime >= DateTime.UtcNow)
                        ? ProjectStatus.NotStarted
                        : ProjectStatus.InProcess;

                if (status == ProjectStatus.InProcess && _faker.Random.Bool(weight: 0.4f))
                {
                    status = ProjectStatus.Suspended;
                }

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
                    EndTime = phases.Last().EndTime,
                    User = owner,
                    Assignees = new List<Assignee> { new() { User = owner, } },
                    Building = GenerateBuildings(),
                    Phases = phases,
                };
            })
            .ToArray();
    }

    private record BuildingSeed(string BuildingName);

    private readonly ICollection<BuildingSeed> _buildings = new BuildingSeed[]
    {
        new("First floor"), //
        new("Parking"), //
        new("Park"), //
        new("Second floor"), //
    };

    private ICollection<Building> GenerateBuildings()
    {
        return Enumerable.Range(0, _faker.Random.Int(1, 3))
            .Select(_ =>
            {
                var building = _faker.Random.CollectionItem(_buildings);

                return new Building
                {
                    BuildingName = building.BuildingName, //
                };
            })
            .ToArray();
    }

    private readonly string[] _phaseNames = new[]
    {
        "Planning", //
        "Pre-construction", //
        "Procurement", //
        "Construction", //
        "Post-construction", //
    };

    private ICollection<Phase> GeneratePhases()
    {
        var currentPhase = _faker.Random.Int(0, _phaseNames.Length);

        DateTime GenerateTime(int phaseStep) => phaseStep >= currentPhase
            ? _faker.Date.Future(yearsToGoForward: 5)
            : _faker.Date.Past(yearsToGoBack: 5);

        return Enumerable.Range(0, _phaseNames.Length)
            .Select(phaseStep => new Phase
            {
                PhaseName = _phaseNames[phaseStep],
                StartTime = GenerateTime(phaseStep).ToUniversalTime(),
                EndTime = GenerateTime(phaseStep).ToUniversalTime(),
                PhaseStep = phaseStep,
            })
            .ToArray();
    }
}