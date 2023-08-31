using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PracticeWebApp.Dtos.Roles;
using System.ComponentModel.DataAnnotations;

namespace PracticeWebApp.Dtos.Users
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset CreatedDate { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();

    }

    public class UserGetDto : UserDto
    {
        public int Id { get; set; }
        public List<string> Roles { get; set; } = new();
    }

    public class UserDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
    }

    public class UserDetailDto : UserGetDto
    {

    }

    public class UserSummaryDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public List<string> Roles { get; set; } = new List<string>();

    }

    public class UserCreateDto : UserDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }

    public class LoginUserDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<User, UserGetDto>();
            CreateMap<User, UserDetailDto>();
            CreateMap<User, UserSummaryDto>()
                .ReverseMap(); ;
            CreateMap<UserCreateDto, UserSummaryDto>();

            CreateMap<User, UserCreateDto>()
                .ReverseMap();
        }
    }
}