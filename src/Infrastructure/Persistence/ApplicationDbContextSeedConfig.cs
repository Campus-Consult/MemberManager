namespace MemberManager.Infrastructure.Persistence
{
    public class ApplicationDbContextSeedConfig
    {
        public bool Enabled { get; set; }
       
        /// whether or not Persons, Positions, CareerLevels, MemberStatus, PersonPositions,
        /// PersonCareerLevels and PersonMemberStatus should be cleared before seeding test data
        public bool ClearExistingData { get; set; }
        
        // even if clearing existing data, keep persons
        public bool KeepPersons { get; set; }
        
        // initial Seed for the random instance
        public int? Seed { get; set; }
        public int Persons { get; set; }
        public int Positions { get; set; }
        public int CareerLevels { get; set; }
        public int MemberStatus { get; set; }
        public int PersonPositions { get; set; }
        public int PersonCareerLevels { get; set; }
        public int PersonMemberStatus { get; set; }
    }
}
