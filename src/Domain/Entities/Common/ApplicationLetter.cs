namespace MemberManager.Domain.Entities.Common
{
    public abstract class ApplicationLetter
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Title { get; set; }
        public string Letter { get; set; }

        public Person Person { get; set; }
    }
}
