using Microsoft.AspNetCore.Mvc;
using Supabase;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfirmEmailController : ControllerBase
    {
        private readonly Client _supabase;
        private readonly string secretKey = "replace_with_secure_random_key"; // use env var in production

        public ConfirmEmailController(Client supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] ConfirmEmailRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Id))
                return BadRequest(new { message = "Email and Id are required." });

            try
            {
                if (!Guid.TryParse(request.Id, out var userId))
                    return BadRequest(new { message = "Invalid user ID format." });

                // Verify user exists
                var user = await _supabase
                    .From<User>()
                    .Where(x => x.Id == userId)
                    .Single();

                if (user == null)
                    return NotFound(new { message = "User not found." });

                // Generate token with user ID
                var token = GenerateToken(userId, TimeSpan.FromHours(1));

                // Send confirmation email with token
                await SendConfirmationEmailAsync(request.Email, token);

                return Ok(new { message = "Confirmation email sent successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send email.", error = ex.Message });
            }
        }

        [HttpGet("verify")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                return BadRequest(new { message = "Token is required." });

            try
            {
                var userId = ValidateToken(token);
                if (userId == Guid.Empty)
                    return BadRequest(new { message = "Invalid or expired token." });

                var user = await _supabase
                    .From<User>()
                    .Where(x => x.Id == userId)
                    .Single();

                if (user == null)
                    return NotFound(new { message = "User not found." });

                user.UserConfirmed = true;
                await _supabase
                    .From<User>()
                    .Update(user);

                return Ok(new { message = "Email confirmed successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to confirm email.", error = ex.Message });
            }
        }

        private string GenerateToken(Guid userId, TimeSpan validFor)
        {
            var expiry = DateTime.UtcNow.Add(validFor).ToBinary();
            var payload = $"{userId}|{expiry}";
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
            var signature = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)));
            var token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{payload}|{signature}"));
            return WebUtility.UrlEncode(token);
        }

        private Guid ValidateToken(string token)
        {
            try
            {
                var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(WebUtility.UrlDecode(token)));
                var parts = decoded.Split('|');
                if (parts.Length != 3) return Guid.Empty;

                if (!Guid.TryParse(parts[0], out var userId)) return Guid.Empty;
                var expiryBinary = Convert.ToInt64(parts[1]);
                var expiry = DateTime.FromBinary(expiryBinary);
                var signature = parts[2];

                if (DateTime.UtcNow > expiry) return Guid.Empty;

                var payload = $"{userId}|{expiryBinary}";
                using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
                var computedSignature = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)));

                if (computedSignature != signature) return Guid.Empty;

                return userId;
            }
            catch
            {
                return Guid.Empty;
            }
        }

        private async Task SendConfirmationEmailAsync(string email, string token)
        {
            var smtpHost = "smtp.gmail.com";
            var smtpPort = 587;
            var smtpUsername = "matthewhalim310@gmail.com";
            var smtpPassword = "waan rmnp kknh ffub"; // env var recommended

            var fromEmail = "matthewhalim310@gmail.com";
            var subject = "Confirm Your Email - Yin Yang Commerce";

            var confirmationLink = $"http://localhost:3000/confirm-email?token={token}";

            var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Confirm Your Email</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='text-align: center; margin-bottom: 30px;'>
        <h1 style='color: #2c3e50; margin-bottom: 10px;'>Welcome to Yin Yang Commerce</h1>
        <div style='font-size: 24px; margin: 20px 0;'>☯️</div>
        <p style='font-size: 18px; color: #7f8c8d;'>Please confirm your email address</p>
    </div>

    <div style='background: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;'>
        <p style='margin-bottom: 20px;'>Thank you for signing up! To complete your registration and start shopping, please confirm your email address.</p>

        <div style='text-align: center; margin: 30px 0;'>
            <a href='{confirmationLink}' style='background: #2c3e50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>Confirm Email Address</a>
        </div>

        <p style='font-size: 14px; color: #6c757d; margin-top: 20px;'>
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href='{confirmationLink}' style='color: #007bff;'>{confirmationLink}</a>
        </p>
    </div>

    <div style='text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;'>
        <p style='font-size: 14px; color: #6c757d;'>If you didn't create an account, please ignore this email.</p>
        <p style='font-size: 12px; color: #adb5bd; margin-top: 10px;'>一阴一阳 · 谓之道</p>
    </div>
</body>
</html>";

            var plainTextBody = $@"
Welcome to Yin Yang Commerce

Please confirm your email address by clicking the link below:
{confirmationLink}

If you didn't create an account, please ignore this email.

一阴一阳 · 谓之道
";

            using (var client = new SmtpClient(smtpHost, smtpPort))
            {
                client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = subject,
                    Body = htmlBody,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(email);

                mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(plainTextBody, null, "text/plain"));
                mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(htmlBody, null, "text/html"));

                await client.SendMailAsync(mailMessage);
            }
        }
    }

    public class ConfirmEmailRequest
    {
        public string Id {get;set;} = string.Empty;
        public string Email { get; set; } = string.Empty;

    }
}