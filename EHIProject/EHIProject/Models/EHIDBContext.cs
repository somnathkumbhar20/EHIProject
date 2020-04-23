namespace EHIProject.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class EHIDBContext : DbContext
    {
        public EHIDBContext()
            : base("name=EHIDBContext")
        {
        }

        public virtual DbSet<Contacts> Contacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contacts>()
                .Property(e => e.Email)
                .IsFixedLength();
        }
    }
}
