using Microsoft.AspNetCore.SignalR;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Services.Implementations;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Hubs
{
    public class GlobalChatHub : Hub
    {
        IGlobalChatService _chatService;
        IUserServices _userServices;
        public GlobalChatHub(IGlobalChatService chatService, IUserServices userServices)
        {
            _chatService = chatService;
            _userServices = userServices;
        }
        public async Task SendMessage(int userId, string message)
        {
            Users user = await _userServices.GetUser(userId);
            if (user == null) return;
            GlobalChats chat = await _chatService.AddMessage(new GlobalChats
            {
                UserId = user.Id,
                Content = message
            });
            await Clients.All.SendAsync("ReceiveMessage", user.Name, message);
        }
    }
}
