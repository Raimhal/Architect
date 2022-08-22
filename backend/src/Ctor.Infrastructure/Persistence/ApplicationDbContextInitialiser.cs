using Ctor.Domain.Entities;
using Ctor.Domain.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ctor.Infrastructure.Persistence;

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
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
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        if (!_context.Roles.Any())
        {
            await _context.Roles.AddRangeAsync(
                 new Role()
                 {
                     Id = 3,
                     RoleName = "Project manager"
                 },
                 new Role()
                 {
                     Id = 2,
                     RoleName = "Operational manager"
                 },
                 new Role()
                 {
                     Id = 1,
                     RoleName = "Admin"
                 },
                 new Role()
                 {
                     Id = 4,
                     RoleName = "Main engineer"
                 },
                 new Role()
                 {
                     Id = 5,
                     RoleName = "Foreman"
                 });


        }
        if (!_context.Users.Any())
        {
            await _context.Users.AddRangeAsync(
                 new User()
                 {
                     Id = 1,
                     FirstName = "admin",
                     LastName = "admin",
                     UserEmail = "admin@radency.com",
                     Password = "admin",
                     RoleId = 1,
                     CompanyId = 1
                 },
                 new User()
                 {
                     Id = 2,
                     FirstName = "moderator",
                     LastName = "moderator",
                     UserEmail = "moderator@radency.com",
                     Password = "123123",
                     RoleId = 2,
                     CompanyId = 1
                 },
                 new User()
                 {
                     Id = 3,
                     FirstName = "Vitaliy",
                     LastName = "Kravets",
                     UserEmail = "1a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 2
                 },
                 new User()
                 {
                     Id = 4,
                     FirstName = "Adreii",
                     LastName = "Vitiv",
                     UserEmail = "2a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 2
                 },
                 new User()
                 {
                     Id = 5,
                     FirstName = "Yaroslav",
                     LastName = "Fedushin",
                     UserEmail = "3a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 3
                 },
                 new User()
                 {
                     Id = 6,
                     FirstName = "Adreii",
                     LastName = "Vitiv",
                     UserEmail = "4a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 3
                 },
                 new User()
                 {
                     Id = 7,
                     FirstName = "Max",
                     LastName = "Kryluk",
                     UserEmail = "5a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 4
                 },
                 new User()
                 {
                     Id = 8,
                     FirstName = "Tolik",
                     LastName = "Gavriluk",
                     UserEmail = "6a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 4
                 },
                 new User()
                 {
                     Id = 9,
                     FirstName = "Edik",
                     LastName = "Svereda",
                     UserEmail = "7a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 5
                 },
                 new User()
                 {
                     Id = 10,
                     FirstName = "Taras",
                     LastName = "Boyko",
                     UserEmail = "8a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 5
                 },
                 new User()
                 {
                     Id = 11,
                     FirstName = "Pavlo",
                     LastName = "Lis",
                     UserEmail = "9a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 1
                 },
                 new User()
                 {
                     Id = 12,
                     FirstName = "Slavik",
                     LastName = "Piven",
                     UserEmail = "10a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 1
                 }, new User()
                 {
                     Id = 13,
                     FirstName = "Vasil",
                     LastName = "Sergienko",
                     UserEmail = "11a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 2
                 },
                 new User()
                 {
                     Id = 14,
                     FirstName = "Nastya",
                     LastName = "Goretska",
                     UserEmail = "12a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 2

                 },
                 new User()
                 {
                     Id = 15,
                     FirstName = "Kate",
                     LastName = "Parush",
                     UserEmail = "13a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 3
                 },
                 new User()
                 {
                     Id = 16,
                     FirstName = "Viktoria",
                     LastName = "Pavlishina",
                     UserEmail = "14a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 3
                 },
                 new User()
                 {
                     Id = 17,
                     FirstName = "Oksana",
                     LastName = "Rak",
                     UserEmail = "15a@radency.com",
                     Password = "123qweasd",
                     RoleId = 3,
                     CompanyId = 4
                 });
        }
        if (!_context.Companies.Any())
        {
            await _context.Companies.AddRangeAsync(
                new Company
                {
                    Id=1,
                    CompanyId = 9743953,
                    CompanyName = "EloECorporation",
                    Country = "Poland",
                    City = "Krakow",
                    Address = "Street 1/32",
                    Email = "1a@Eloe.com",
                    JoinDate = DateTime.UtcNow
                },
                new Company
                {
                    Id=2,
                    CompanyId = 6437326, 
                    CompanyName = "SigCop",
                    Country = "Ukraine",
                    City = "Lviv",
                    Address = "Street 13/5B",
                    Email = "2a@SigCop.com",
                    JoinDate = DateTime.UtcNow
                },
                new Company
                {
                    Id=3,
                    CompanyId = 4264658,
                    CompanyName = "Pegas",
                    Country = "UK",
                    City = "London",
                    Address = "Street 221",
                    Email = "3a@Eloe.com",
                    JoinDate = DateTime.UtcNow
                },
                new Company
                {
                    Id=4,
                    CompanyId = 1436347,
                    CompanyName = "LeadOf",
                    Country = "US",
                    City = "New York",
                    Address = "Street 1",
                    Email = "4a@Eloe.com",
                    JoinDate = DateTime.UtcNow
                },
                new Company
                {
                    Id=5,
                    CompanyId = 9234198,
                    CompanyName = "CastelCas",
                    Country = "US",
                    City = "Seattle",
                    Address = "Street 3",
                    Email = "5a@Eloe.com",
                    JoinDate = DateTime.UtcNow
                });
        }
        if (!_context.Projects.Any())
        {
            await _context.Projects.AddRangeAsync(
                 new Project
                 {
                     Id = 1,
                     ProjectName = "Leessas Town",
                     ProjectType = "Roads",
                     Country = "Poland",
                     City = "Krakow",
                     Address = "12023 vkd",
                     Budget = 800000000,
                     Status = 1,
                     StartTime = new DateTime(1 / 1 / 2023),
                     EndTime = new DateTime(11 / 11 / 2026),
                     UserId = 4,
                     CompanyId = 1
                 },
                 new Project
                 {
                     Id = 2,
                     ProjectName = "Stoagem Valley",
                     ProjectType = "Housing District",
                     Country = "Poland",
                     City = "Krakow",
                     Address = "4423 a",
                     Budget = 243000000,
                     Status = 2,
                     StartTime = new DateTime(23 / 3 / 2023),
                     EndTime = new DateTime(11 / 11 / 2025),
                     UserId = 5,
                     CompanyId = 1
                 },
                 new Project
                 {
                     Id = 3,
                     ProjectName = "Rufus Street",
                     ProjectType = "Housing District",
                     Country = "Ukraine",
                     City = "Kyiv",
                     Address = "32/1 sb",
                     Budget = 32000000,
                     Status = 1,
                     StartTime = new DateTime(2 / 8 / 2023),
                     EndTime = new DateTime(11 / 12 / 2025),
                     UserId = 6,
                     CompanyId = 2
                 },
                 new Project
                 {
                     Id = 4,
                     ProjectName = "Cliftonville",
                     ProjectType = "Housing District",
                     Country = "Ukraine",
                     City = "Poltava",
                     Address = "42 shishi",
                     Budget = 120000000,
                     Status = 1,
                     StartTime = new DateTime(20 / 8 / 2022),
                     EndTime = new DateTime(12 / 11 / 2025),
                     UserId = 7,
                     CompanyId = 2
                 },
                 new Project
                 {
                     Id = 5,
                     ProjectName = "Plotezalf Center",
                     ProjectType = "Housing District",
                     Country = "Uk",
                     City = "London",
                     Address = "34/3 P",
                     Budget = 460000000,
                     Status = 4,
                     StartTime = new DateTime(20 / 8 / 2022),
                     EndTime = new DateTime(11 / 11 / 2025),
                     UserId = 7,
                     CompanyId = 3
                 },
                 new Project
                 {
                     Id = 6,
                     ProjectName = "Wistful Vista",
                     ProjectType = "Housing District",
                     Country = "Uk",
                     City = "Liverpool",
                     Address = "12023 vkd",
                     Budget = 320000000,
                     Status = 1,
                     StartTime = new DateTime(20 / 8 / 2022),
                     EndTime = new DateTime(8 / 10 / 2024),
                     UserId = 8,
                     CompanyId = 3
                 },
                 new Project
                 {
                     Id = 7,
                     ProjectName = "Upper South Xorisk",
                     ProjectType = "Housing District",
                     Country = "US",
                     City = "Seattle",
                     Address = "12023 vkd",
                     Budget = 80000000,
                     Status = 1,
                     StartTime = new DateTime(12 / 9 / 2022),
                     EndTime = new DateTime(8 / 4 / 2024),
                     UserId = 9,
                     CompanyId = 4
                 },
                 new Project
                 {
                     Id = 8,
                     ProjectName = "Ropewalks",
                     ProjectType = "Housing District",
                     Country = "US",
                     City = "Washington",
                     Address = "12023 vkd",
                     Budget = 420000000,
                     Status = 1,
                     StartTime = new DateTime(11 / 12 / 2022),
                     EndTime = new DateTime(8 / 4 / 2024),
                     UserId = 15,
                     CompanyId = 5
                 });
        }
        if (!_context.Buildings.Any())
        {
            await _context.Buildings.AddRangeAsync(
                new Building
                {
                    Id = 1,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Parking,
                    ProjectId = 1
                },
                new Building
                {
                    Id = 2,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Front,
                    ProjectId = 2
                },
                new Building
                {
                    Id = 3,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Parking,
                    ProjectId = 3
                },
                new Building
                {
                    Id = 4,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Parking,
                    ProjectId = 4
                },
                new Building
                {
                    Id = 5,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 5
                },
                new Building
                {
                    Id = 6,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 6
                },
                new Building
                {
                    Id = 7,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 7
                }, new Building
                {
                    Id = 8,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 8
                }, new Building
                {
                    Id = 9,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 2
                }, new Building
                {
                    Id = 10,
                    BuildingType = BuildingType.Appartment,
                    BlockType = BuildingBlockType.Floor,
                    ProjectId = 4
                });
        }
        if (!_context.Phases.Any())
        {
            await _context.Phases.AddRangeAsync(
                new Phase
                {
                    Id = 1,
                    PhaseName = "Progress",
                    StartTime = new DateTime(8 / 7 / 2022),
                    EndTime = new DateTime(8 / 7 / 2023),
                    PhaseStep = 5,
                    ProjectId = 1
                },
                new Phase
                {
                    Id = 2,
                    PhaseName = "Progress",
                    StartTime = new DateTime(4 / 5 / 2022),
                    EndTime = new DateTime(4 / 7 / 2022),
                    PhaseStep = 5,
                    ProjectId = 2
                }, new Phase
                {
                    Id = 3,
                    PhaseName = "Starting soon",
                    StartTime = new DateTime(14 / 6 / 2022),
                    EndTime = new DateTime(11 / 11 / 2022),
                    PhaseStep = 5,
                    ProjectId = 3
                }, new Phase
                {
                    Id = 4,
                    PhaseName = "Starting soon",
                    StartTime = new DateTime(14 / 2 / 2022),
                    EndTime = new DateTime(15 / 9 / 2022),
                    PhaseStep = 7,
                    ProjectId = 4
                }, new Phase
                {
                    Id = 5,
                    PhaseName = "Progress",
                    StartTime = new DateTime(1 / 3 / 2022),
                    EndTime = new DateTime(20 / 9 / 2022),
                    PhaseStep = 2,
                    ProjectId = 5
                }, new Phase
                {
                    Id = 6,
                    PhaseName = "Starting soon",
                    StartTime = new DateTime(4 / 5 / 2022),
                    EndTime = new DateTime(27 / 9 / 2022),
                    PhaseStep = 6,
                    ProjectId = 6
                }, new Phase
                {
                    Id = 7,
                    PhaseName = "Starting soon",
                    StartTime = new DateTime(30 / 5 / 2022),
                    EndTime = new DateTime(1 / 10 / 2022),
                    PhaseStep = 5,
                    ProjectId = 7
                }, new Phase
                {
                    Id = 8,
                    PhaseName = "Progress",
                    StartTime = new DateTime(12 / 5 / 2022),
                    EndTime = new DateTime(17 / 9 / 2022),
                    PhaseStep = 8,
                    ProjectId = 8
                }, new Phase
                {
                    Id = 9,
                    PhaseName = "Finishing phase",
                    StartTime = new DateTime(12 / 5 / 2022),
                    EndTime = new DateTime(14 / 9 / 2022),
                    PhaseStep = 6,
                    ProjectId = 2
                }, new Phase
                {
                    Id = 10,
                    PhaseName = "Progress",
                    StartTime = new DateTime(10 / 5 / 2022),
                    EndTime = new DateTime(12 / 1 / 2023),
                    PhaseStep = 3,
                    ProjectId = 5
                }, new Phase
                {
                    Id = 11,
                    PhaseName = "Finishing phase",
                    StartTime = new DateTime(13 / 5 / 2022),
                    EndTime = new DateTime(14 / 10 / 2022),
                    PhaseStep = 2,
                    ProjectId = 6
                });
        }

        await _context.SaveChangesAsync();
    }
}
