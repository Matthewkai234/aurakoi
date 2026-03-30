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

await supabase.InitializeAsync();
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();