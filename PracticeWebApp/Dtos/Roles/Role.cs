using Microsoft.AspNetCore.Identity;

namespace PracticeWebApp.Dtos.Roles
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
    }
}
