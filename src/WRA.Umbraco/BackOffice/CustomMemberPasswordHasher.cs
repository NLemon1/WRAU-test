using System.Security.Cryptography;
using System.Text;
using GlobalPayments.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Extensions;


public class CustomMemberPasswordHasher<Tuser> : UmbracoPasswordHasher<Tuser> where Tuser : MemberIdentityUser
{

    public CustomMemberPasswordHasher(LegacyPasswordSecurity legacyPasswordSecurity, IJsonSerializer jsonSerializer)
       : base(legacyPasswordSecurity, jsonSerializer)
    {

    }

    public override string HashPassword(Tuser member, string password)
    {
        // get salt
        string saltStr = member.Id.ToString().Replace("-", string.Empty);
        byte[] salt = Encoding.UTF8.GetBytes(saltStr);

        //hash password
        var passHash = HashPw(password, salt);

        return passHash;
        // return base.HashPassword(user, password);
    }

    private string HashPw(string password, byte[] salt)
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