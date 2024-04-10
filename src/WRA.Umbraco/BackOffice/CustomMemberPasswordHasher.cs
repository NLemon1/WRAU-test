using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;

public class CustomMemberPasswordHasher<TUser>(
    LegacyPasswordSecurity legacyPasswordSecurity,
    IJsonSerializer jsonSerializer,
    IMemberService memberService,
    ILogger<CustomMemberPasswordHasher<TUser>> logger)
    : UmbracoPasswordHasher<TUser>(legacyPasswordSecurity, jsonSerializer)
        where TUser : MemberIdentityUser
{
    public override PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword)
    {
        // first try the upstream password hasher
        var upstreamResult = base.VerifyHashedPassword(user, hashedPassword, providedPassword);
        if (upstreamResult == PasswordVerificationResult.Failed)
        {
            // try out own comparison
            // Get member
            var memberIdentity = memberService.GetByKey(user.Key);
            if (memberIdentity == null)
            {
                logger.LogError("Member not found for key in password verification");
                return upstreamResult;
            }
            // get salt
            var memberSalt = memberIdentity.GetValue<string>("token");
            if (memberSalt != null)
            {
                var salt = Encoding.UTF8.GetBytes(memberSalt);

                var passHash = HashPw(providedPassword, salt);
                if (passHash == hashedPassword)
                {
                    return PasswordVerificationResult.Success;
                }
            }
        }
        return upstreamResult;
    }


    public override string HashPassword(TUser member, string password)
    {
        try
        {
            if (member.Key == Guid.Empty)
            {
                // if the key doesn't exist, the user is being created via back office
                // for now - we will a pass them to the base class to handle hashing
                return base.HashPassword(member, password);
            }
            // get salt
            var saltStr = Guid.NewGuid().ToString().Replace("-", string.Empty);

            var salt = Encoding.UTF8.GetBytes(saltStr);

            //hash password
            var passHash = HashPw(password, salt);
            SetSaltPropertyOnMember(member, saltStr);
            return passHash;
        }
        catch (Exception ex)
        {
            logger.LogError("Error hashing password user email: {Email} - {Message}", member.Email, ex.Message);
            throw;
        }
    }

    private void SetSaltPropertyOnMember(TUser member, string salt)
    {
        if (member?.Key == null || member?.Key == Guid.Empty) return;
        var memberIdentity = memberService.GetByKey(member.Key);
        memberIdentity?.SetValue("token", salt);
        if (memberIdentity != null) memberService.Save(memberIdentity);
    }

    private static string HashPw(string password, byte[] salt)
    {
        byte[] passByteArray = Encoding.UTF8.GetBytes(password);
        byte[] saltedHash = GenerateSaltedHash(passByteArray, salt);

        return Convert.ToBase64String(saltedHash);
    }

    private static byte[] GenerateSaltedHash(byte[] plainText, byte[] salt)
    {
        HashAlgorithm algorithm = new SHA256Managed();

        byte[] plainTextWithSaltBytes =
            new byte[plainText.Length + salt.Length];

        for (int i = 0; i < plainText.Length; i++)
        {
            plainTextWithSaltBytes[i] = plainText[i];
        }

        for (int i = 0; i < salt.Length; i++)
        {
            plainTextWithSaltBytes[plainText.Length + i] = salt[i];
        }

        return algorithm.ComputeHash(plainTextWithSaltBytes);
    }
}