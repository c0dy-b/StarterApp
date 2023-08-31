using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticeWebApp.Dtos.Users;
using PracticeWebApp.Services;
using System.Security.Claims;

namespace PracticeWebApp.Controllers
{
    [ApiController]
    [Route("api/auth/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext.DataContext _dataContext;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public AuthenticationController(
            DataContext.DataContext dataContext,
            IMapper mapper,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IUserService userService)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("create-user")]
        public async Task<ActionResult<UserSummaryDto>> Create(UserCreateDto request)
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
            };

            var createdUser = await _userManager.CreateAsync(user, request.Password);

            if (!createdUser.Succeeded)
            {
                throw new Exception(createdUser.Errors.First().Description, new Exception("There was a problem creating the user"));
            }

            var addToRole = await _userManager.AddToRoleAsync(user, request.Role);

            if (!addToRole.Succeeded)
            {
                throw new Exception("There was a problem adding user to role");
            }

            var createdUserDto = _mapper.Map<UserSummaryDto>(user);
            return Ok(createdUserDto);
        }

        [AllowAnonymous]
        [HttpPost("sign-in")]
        public async Task<UserSummaryDto> SignIn(LoginUserDto request)
        {
            var userEntity = await _dataContext.Set<User>()
                .Include(x => x.Roles)
                .SingleOrDefaultAsync(x => x.UserName == request.Username);

            if (userEntity == null)
            {

                throw new Exception("User not found.");
            }

            var checkPassword = _signInManager.CheckPasswordSignInAsync(userEntity, request.Password, true);

            if (!checkPassword.IsCompletedSuccessfully)
            {
                throw new Exception("Password Incorrect");
            }

            await _signInManager.SignInAsync(userEntity, false);

            var loggedInUser = _mapper.Map<UserSummaryDto>(userEntity);

            return loggedInUser;
        }

        [HttpGet("get-current-user")]
        public async Task<UserDetailDto> GetCurrentUser()
        {
            // TODO: Figure out why this is failing when maiking request from frontend upon login.
            ClaimsPrincipal claimsPrincipal = User;
            var userClaimValue = claimsPrincipal?.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Something went wrong fetching user");
            int? currentUserId = int.Parse(userClaimValue);
            var user = await _userManager.FindByIdAsync($"{currentUserId}");
            var userDto = _mapper.Map<UserDetailDto>(user);

            return userDto;
        }

        [HttpPost("sign-out")]
        public async Task<ActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

    }
}
