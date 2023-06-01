using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PracticeWebApp.Dtos.Roles;

namespace PracticeWebApp.DataContext.Resources
{
    public class MigrateAndSeed
    {
        public static async Task Initialize(IServiceProvider services)
        {
            var context = services.GetRequiredService<DataContext>();
            await context.Database.MigrateAsync();

            await AddRoles(services);
        }

        private static async Task AddRoles(IServiceProvider services)
        {
            var roleManager = services.GetRequiredService<RoleManager<Role>>();

            if (!await roleManager.RoleExistsAsync(RoleConstants.User))
            {
                var role = new Role { Name = RoleConstants.User};
                await roleManager.CreateAsync(role);
            }
        }
    }
}
