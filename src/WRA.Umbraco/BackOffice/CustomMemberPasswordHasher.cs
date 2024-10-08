using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.BackOffice;

public class CustomMemberPasswordHasher<TUser>(
    LegacyPasswordSecurity legacyPasswordSecurity,
    IJsonSerializer jsonSerializer, IMemberService memberService,
    ILogger<CustomMemberPasswordHasher<TUser>> logger)
    : UmbracoPasswordHasher<TUser>(legacyPasswordSecurity, jsonSerializer)
where TUser : MemberIdentityUser
{
    private const string _memberSaltPropertyAlias = "token";

    public override string HashPassword(TUser user, string password)
    {
        try
        {
            string saltStr = Guid.NewGuid().ToString().Replace("-", string.Empty);

            var salt = Encoding.UTF8.GetBytes(saltStr);

            string passHash = HashPw(password, salt);

            SetSaltPropertyOnMember(user, saltStr);

            return passHash;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error hashing password user email: {Email} - {Message}", user.Email, ex.Message);
            throw new PasswordHasherException($"Error hashing password user email: {user.Email} - {ex.Message}", ex);
        }
    }

    public override PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword)
    {
        var member = memberService.GetByKey(user.Key);
        string? saltString = member.GetValue<string>(_memberSaltPropertyAlias);
        if (string.IsNullOrEmpty(saltString))
        {
            return base.VerifyHashedPassword(user, hashedPassword, providedPassword);
        }

        var decodedSalt = DecodeHash(saltString);
        byte[] salt = Encoding.UTF8.GetBytes(decodedSalt);
        string verifyHash = HashPw(providedPassword, salt);
        return verifyHash.Equals(hashedPassword) ?
            PasswordVerificationResult.Success :
            base.VerifyHashedPassword(user, hashedPassword, providedPassword);
    }

    private void SetSaltPropertyOnMember(TUser member, string salt)
    {
        if (member.Key != Guid.Empty)
        {
            string? encodedHash = EncodeHash(salt);
            var memberIdentity = memberService.GetByKey(member.Key);
            memberIdentity.SetValue(_memberSaltPropertyAlias, encodedHash);
            memberService.Save(memberIdentity);
        }
    }

    private string? EncodeHash(string hash)
    {
        byte[] hashBytes = Encoding.UTF8.GetBytes(hash);
        return Convert.ToBase64String(hashBytes);
    }

    public string DecodeHash(string encodedHash)
    {
        byte[] encodedBytes = Convert.FromBase64String(encodedHash);
        return Encoding.UTF8.GetString(encodedBytes);
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