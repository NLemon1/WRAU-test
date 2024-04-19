using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.BackOffice;

public class CustomMemberPasswordHasher<TUser>(LegacyPasswordSecurity legacyPasswordSecurity, IJsonSerializer jsonSerializer, IMemberService memberService, ILogger<CustomMemberPasswordHasher<TUser>> logger) : UmbracoPasswordHasher<TUser>(legacyPasswordSecurity, jsonSerializer)
where TUser : MemberIdentityUser
{
    private const string _memberSaltPropertyAlias = "token";
    private readonly IMemberService _memberService = memberService;
    private readonly ILogger<CustomMemberPasswordHasher<TUser>> _logger = logger;

    public override string HashPassword(TUser user, string password)
    {
        try
        {
            string saltStr = Guid.NewGuid().ToString().Replace("-", string.Empty);

            var salt = Encoding.UTF8.GetBytes(saltStr);

            string passHash = CustomMemberPasswordHasher<TUser>.HashPw(password, salt);

            SetSaltPropertyOnMember(user, saltStr);

            return passHash;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error hashing password user email: {Email} - {Message}", user.Email, ex.Message);
            throw new PasswordHasherException($"Error hashing password user email: {user.Email} - {ex.Message}", ex);
        }
    }

    private void SetSaltPropertyOnMember(TUser member, string salt)
    {
        if (member.Key != Guid.Empty)
        {
            var memberIdentity = _memberService.GetByKey(member.Key);
            memberIdentity.SetValue(_memberSaltPropertyAlias, salt);
            _memberService.Save(memberIdentity);
        }
    }

    private static string HashPw(string password, byte[] salt)
    {
        byte[] passByteArray = Encoding.UTF8.GetBytes(password);
        byte[] saltedHash = GenerateSaltedHash(passByteArray, salt);

        return Convert.ToBase64String(saltedHash);
    }

    private static byte[] GenerateSaltedHash(byte[] plainText, byte[] salt)
    {
        byte[] plainTextWithSaltBytes = new byte[plainText.Length + salt.Length];

        for (int i = 0; i < plainText.Length; i++)
        {
            plainTextWithSaltBytes[i] = plainText[i];
        }

        for (int i = 0; i < salt.Length; i++)
        {
            plainTextWithSaltBytes[plainText.Length + i] = salt[i];
        }

        return SHA256.HashData(plainTextWithSaltBytes);
    }
}