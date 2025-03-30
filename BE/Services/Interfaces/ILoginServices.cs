namespace ProjectPRN22_Backend.Services.Interfaces
{
    public interface ILoginServices
    {
        Task<string> Login(string code);
    }
}
