using Microsoft.EntityFrameworkCore.Migrations;

namespace Celeste.Migrations
{
    public partial class addUserIDTOMode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Mode",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Mode",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
