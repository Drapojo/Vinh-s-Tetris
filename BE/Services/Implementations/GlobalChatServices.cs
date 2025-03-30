using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Services.Implementations
{
    public class GlobalChatServices : IGlobalChatService
    {
        IGlobalChatsRepo _globalChatsRepo;
        public GlobalChatServices(IGlobalChatsRepo globalChatsRepo)
        {
            _globalChatsRepo = globalChatsRepo;
        }
        public async Task<GlobalChats> AddMessage(GlobalChats message)
        {
            return await _globalChatsRepo.AddAsync(message);
        }
    }
}
