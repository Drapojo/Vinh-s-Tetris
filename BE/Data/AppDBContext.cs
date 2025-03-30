using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Models.Entities;

namespace ProjectPRN22_Backend.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<GlobalChats> GlobalChats { get; set; }
        public DbSet<Histories> Histories { get; set; }
        public DbSet<Musics> Musics { get; set; }
        public DbSet<Backgrounds> Backgrounds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Backgrounds>()
                .HasIndex(b => b.Name)
                .IsUnique();
            modelBuilder.Entity<Musics>()
                .HasIndex(m => m.Name)
                .IsUnique();
            modelBuilder.Entity<GlobalChats>()
                .HasOne(gc => gc.User)
                .WithMany(u => u.GlobalChats)
                .HasForeignKey(gc => gc.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Ensures that when a User is deleted, related messages are also removed

            modelBuilder.Entity<Histories>()
                .HasOne(h => h.User)
                .WithMany(u => u.Histories)
                .HasForeignKey(h => h.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Ensures that when a User is deleted, related histories are also removed
        }

    }
}
