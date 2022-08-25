using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ctor.Infrastructure.Migrations
{
    public partial class projectPhotopropertynameschange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RelativePath",
                table: "ProjectPhoto",
                newName: "Path");

            migrationBuilder.RenameColumn(
                name: "GlobalPath",
                table: "ProjectPhoto",
                newName: "Link");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "ProjectPhoto",
                newName: "RelativePath");

            migrationBuilder.RenameColumn(
                name: "Link",
                table: "ProjectPhoto",
                newName: "GlobalPath");
        }
    }
}
