using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ctor.Infrastructure.Migrations
{
    public partial class AddCompanyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CompanyId",
                table: "Company",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Company");
        }
    }
}
