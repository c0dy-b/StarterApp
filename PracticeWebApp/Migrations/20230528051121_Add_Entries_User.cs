using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticeWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Add_Entries_User : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Entry",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Entry",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entry_UserId",
                table: "Entry",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_AspNetUsers_UserId",
                table: "Entry",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_AspNetUsers_UserId",
                table: "Entry");

            migrationBuilder.DropIndex(
                name: "IX_Entry_UserId",
                table: "Entry");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Entry");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Entry");
        }
    }
}
