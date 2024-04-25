using NPoco;

namespace WRA.Umbraco.Helpers;

public static class MemberSubscriptionQueries
{
    public static Sql GetById(int memberId) => new($"SELECT * FROM MemberSubscriptionTable WHERE Id = {memberId}");

    public static Sql GetActiveSubscriptionsForMember(int memberId) =>
        new($"SELECT * FROM MemberSubscriptionTable WHERE MemberId = {memberId} AND isActive = 1");
}