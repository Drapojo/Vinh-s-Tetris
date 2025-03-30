using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using vinhvdqhe180173LAB1.Repositories.Implementations;

namespace ProjectPRN22_Backend.Repositories.Implementations
{
    public class GlobalChatsRepo : Repository<GlobalChats>, IGlobalChatsRepo
    {
        public GlobalChatsRepo(AppDBContext context) : base(context)
        {
        }
    }
}
