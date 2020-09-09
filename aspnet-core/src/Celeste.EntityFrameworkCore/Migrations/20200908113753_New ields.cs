using Microsoft.EntityFrameworkCore.Migrations;

namespace Celeste.Migrations
{
    public partial class Newields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "AbpTenants",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AbpTenants",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AbpTenants",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AbpTenants",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AbpUsers_AbpTenants_TenantId",
                table: "AbpUsers",
                column: "TenantId",
                principalTable: "AbpTenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpUsers_AbpTenants_TenantId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "AbpTenants");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AbpTenants");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AbpTenants");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "AbpTenants");
        }
    }
}
