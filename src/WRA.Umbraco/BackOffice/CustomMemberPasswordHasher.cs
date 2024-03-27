using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

public class CustomMemberPasswordHasher<Tuser> : UmbracoPasswordHasher<Tuser> where Tuser : MemberIdentityUser
{
    private readonly IMemberService _memberService;
    private readonly ILogger<CustomMemberPasswordHasher<Tuser>> _logger;

    public CustomMemberPasswordHasher(
        LegacyPasswordSecurity legacyPasswordSecurity,
        IJsonSerializer jsonSerializer,
        IMemberService memberService,
        ILogger<CustomMemberPasswordHasher<Tuser>> logger)
        : base(legacyPasswordSecurity, jsonSerializer)
    {
        _memberService = memberService;
        _logger = logger;
    }

    public override string HashPassword(Tuser member, string password)
    {
        try
        {
            // get salt
            string saltStr;
            saltStr = Guid.NewGuid().ToString().Replace("-", string.Empty);

            byte[] salt = Encoding.UTF8.GetBytes(saltStr);

            //hash password
            var passHash = HashPw(password, salt);
            SetSaltPropertyOnMember(member, saltStr);
            return passHash;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error hashing password user email: {member.Email} - {ex.Message}");
            throw ex;
        }
    }

    private void SetSaltPropertyOnMember(Tuser member, string salt)
    {
        var memberIdentity = _memberService.GetByKey(member.Key);
        memberIdentity.SetValue("token", salt);
        _memberService.Save(memberIdentity);
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