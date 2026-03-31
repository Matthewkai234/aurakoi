using Backend.Models;
using Supabase; 


var builder = WebApplication.CreateBuilder(args);
// var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
// var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

var url="https://cgtmywcpoldeskhgejpf.supabase.co";
var key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndG15d2Nwb2xkZXNraGdlanBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTAwODUsImV4cCI6MjA5MDQ2NjA4NX0.P3_FZJY0aOaMuNr6UKYaCR_zlQgj3CrPhJ2UKGtdQr0";


var options = new Supabase.SupabaseOptions 
{
    AutoConnectRealtime = true
};

var supabase = new Supabase.Client(url, key, options);

var result = await supabase.From<Product>().Get();
var product = result.Models;
Console.WriteLine(product[0].Title);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});


await supabase.InitializeAsync();
// builder.Services.AddControllers(); 
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.DefaultIgnoreCondition = 
            System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton(supabase);

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();