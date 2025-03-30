namespace ProjectPRN22_Backend.Models.Schemas
{
    public class ResponsePublics<T>
    {
        public IEnumerable<T> Data { get; set; } = new List<T>();
        public int Count { get; set; } = 0;
    }
}
