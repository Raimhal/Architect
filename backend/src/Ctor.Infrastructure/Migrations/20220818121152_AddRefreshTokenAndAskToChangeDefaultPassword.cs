using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ctor.Infrastructure.Migrations
{
    public partial class AddRefreshTokenAndAskToChangeDefaultPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TodoLists",
                table: "TodoLists");

            migrationBuilder.RenameTable(
                name: "TodoLists",
                newName: "MyEntity");

            migrationBuilder.AddColumn<bool>(
                name: "AskToChangeDefaultPassword",
                table: "User",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiresAt",
                table: "User",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MyEntity",
                table: "MyEntity",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MyEntity",
                table: "MyEntity");

            migrationBuilder.DropColumn(
                name: "AskToChangeDefaultPassword",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiresAt",
                table: "User");

            migrationBuilder.RenameTable(
                name: "MyEntity",
                newName: "TodoLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TodoLists",
                table: "TodoLists",
                column: "Id");
        }
    }
}
