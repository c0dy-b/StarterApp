using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PracticeWebApp.Dtos.Roles;
using PracticeWebApp.Dtos.Users;

namespace PracticeWebApp.Services
{
    public interface IUserService
    {
        public Task<UserSummaryDto> CreateUser(UserCreateDto request);
    }

    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<UserSummaryDto> CreateUser(UserCreateDto request)
        {
            var requestedUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                CreatedDate = DateTime.UtcNow,
            };

            var createdUser = await _userManager.CreateAsync(_mapper.Map<User>(requestedUser), request.Password);

            if (!createdUser.Succeeded)
            {
                HandleErrors(createdUser.Errors);
            }

            List<string> role = new() { RoleConstants.User };
            var addRole = await _userManager.AddToRolesAsync(requestedUser, role);

            if (!addRole.Succeeded)
            {
                HandleErrors(addRole.Errors);
            }

            return _mapper.Map<UserSummaryDto>(request);
        }

        private static void HandleErrors(IEnumerable<IdentityError> errors)
        {
            foreach (var error in errors)
            {
                throw new Exception($"Code: {error.Code}\nDescription: {error.Description}");
            }
        }
    }
}
