using Microsoft.AspNetCore.SignalR;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Services.Implementations;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Hubs
{
    public class GlobalChatHub : Hub
    {
        IUserServices _userServices;
        public GlobalChatHub(IUserServices userServices)
        {
            _userServices = userServices;
        }
        public async Task SendMessage(int userId, string message)
        {
            Users user = await _userServices.GetUser(userId);
            if (user == null) return;
            await Clients.All.SendAsync("ReceiveMessage", user.Name, message);
        }
    }
}
