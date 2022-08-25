using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ctor.Infrastructure.Migrations
{
    public partial class addenumRolesAndRenameFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "Role",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Role",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Role_Type",
                table: "Role",
                column: "Type",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Role_Type",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Role");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Role",
                newName: "RoleName");
        }
    }
}
