using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Celeste.Migrations
{
    public partial class addUserModesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mode_AbpUsers_UserId",
                table: "Mode");

            migrationBuilder.DropIndex(
                name: "IX_Mode_UserId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Mode");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Mode");

            migrationBuilder.CreateTable(
                name: "UserModes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    ModeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserModes_Mode_ModeId",
                        column: x => x.ModeId,
                        principalTable: "Mode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserModes_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserModes_ModeId",
                table: "UserModes",
                column: "ModeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserModes_UserId",
                table: "UserModes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModes");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "Mode",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "Mode",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "Mode",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "Mode",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Mode",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "Mode",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "Mode",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Mode",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Mode",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

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
                onDelete: ReferentialAction.Cascade);
        }
    }
}
