using Backend.Models;
using Supabase; 


var builder = WebApplication.CreateBuilder(args);
// var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
// var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

var url="https://cgtmywcpoldeskhgejpf.supabase.co";
var key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndG15d2Nwb2xkZXNraGdlanBmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg5MDA4NSwiZXhwIjoyMDkwNDY2MDg1fQ.e9BsE-2zLHcAVICkeOvB8uIIUWNSKy8vfoDMZBtCaoQ";


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