using Microsoft.EntityFrameworkCore;

namespace PracticeWebApp.DataContext
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        DbSet<Entry> Entries { get; set; }
    }
}
