using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using PracticeWebApp.DataContext;
using PracticeWebApp.DataContext.Resources;
using PracticeWebApp.Dtos;
using PracticeWebApp.Dtos.Entries;
using PracticeWebApp.Dtos.Roles;
using PracticeWebApp.Dtos.Users;
using PracticeWebApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Custom Services
builder.Services.AddScoped<IUserService, UserService>();

// Configure Identity
builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<DataContext>()
    .AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();

// Auto Mapper Configurations
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingConfiguration());
    mc.AddProfile(new UserMapping());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});

//ServiceProvider provider = builder.Services.BuildServiceProvider();
//var configuration = provider.GetService<IConfiguration>();

//builder.Services.AddCors(options =>
//{
//    string? frontendURL = configuration?.GetValue<string>("frontend_url");

//    options.AddDefaultPolicy(builder =>
//    {
//        builder
//        .AllowAnyOrigin()
//        .AllowAnyMethod()
//        .AllowAnyHeader();
//    });
//});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    await MigrateAndSeed.Initialize(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();

app.UseStaticFiles();

//app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.UseRouting()
    .UseEndpoints(e => e.MapControllers());

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.UseSpa(spaBuilder =>
{
    spaBuilder.Options.SourcePath = "my-app";
    if (app.Environment.IsDevelopment())
    {
        spaBuilder.UseProxyToSpaDevelopmentServer("https://localhost:3000");
    }
});

app.Run();
