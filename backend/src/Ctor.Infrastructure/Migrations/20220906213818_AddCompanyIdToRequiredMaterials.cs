using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ctor.Infrastructure.Migrations
{
    public partial class AddCompanyIdToRequiredMaterials : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CompanyId",
                table: "RequiredMaterials",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_RequiredMaterials_CompanyId",
                table: "RequiredMaterials",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_RequiredMaterials_Company_CompanyId",
                table: "RequiredMaterials",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequiredMaterials_Company_CompanyId",
                table: "RequiredMaterials");

            migrationBuilder.DropIndex(
                name: "IX_RequiredMaterials_CompanyId",
                table: "RequiredMaterials");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "RequiredMaterials");
        }
    }
}
