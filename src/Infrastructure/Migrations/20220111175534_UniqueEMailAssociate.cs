using Microsoft.EntityFrameworkCore.Migrations;

namespace MemberManager.Infrastructure.Migrations
{
    public partial class UniqueEMailAssociate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EmailAssociaton",
                table: "People",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_People_EmailAssociaton",
                table: "People",
                column: "EmailAssociaton",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_People_EmailAssociaton",
                table: "People");

            migrationBuilder.AlterColumn<string>(
                name: "EmailAssociaton",
                table: "People",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
