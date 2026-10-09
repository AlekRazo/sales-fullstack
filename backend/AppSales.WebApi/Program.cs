using AppSales.WebApi.Business;
using AppSales.WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<SalesBusiness>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(opt => opt.DarkMode = true);
}

app.UseHttpsRedirection();

app.UseCors("AngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
