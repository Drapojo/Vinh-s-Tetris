using ProjectPRN22_Backend.Models.Entities;

namespace ProjectPRN22_Backend.Services.Interfaces
{
    public interface IGlobalChatService
    {
        Task<GlobalChats> AddMessage(GlobalChats message);
    }
}
