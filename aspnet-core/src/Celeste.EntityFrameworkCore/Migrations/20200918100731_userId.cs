using Microsoft.EntityFrameworkCore.Migrations;

namespace Celeste.Migrations
{
    public partial class userId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Mode",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mode_UserId",
                table: "Mode",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode");

            migrationBuilder.DropIndex(
                name: "IX_Mode_UserId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Mode");
        }
    }
}
