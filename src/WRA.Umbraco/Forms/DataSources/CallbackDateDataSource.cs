using Umbraco.Forms.Core;
using Umbraco.Forms.Core.Models;
using WRA.Umbraco.Exceptions;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Forms.SubmitHotlineCall;

public class CallbackDateDataSource : FieldPreValueSourceType
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient;

    [global::Umbraco.Forms.Core.Attributes.Setting(
         name: "Days to Show",
         Alias = "hotlineCallDropDownDaysToShow",
         Description = "Number of days to retrieve.",
         View = "NumericField")]
    public int DaysToShow { get; set; } = 5;

    [global::Umbraco.Forms.Core.Attributes.Setting(
         name: "Morning cutoff time",
         Alias = "hotlineCallDropDownSameDayMorningCutoffTime",
         Description = "The cutoff time for showing AM option. (24hr)",
         View = "NumericField")]
    public int MorningCutoffTime { get; set; } = 11;

    [global::Umbraco.Forms.Core.Attributes.Setting(
         name: "Afternoon cutoff time",
         Alias = "hotlineCallDropDownSameDayAfternoonCutoffTime",
         Description = "The cutoff time for showing PM option. (24hr)",
         View = "NumericField")]
    public int AfternoonCutoffTime { get; set; } = 14;

    public CallbackDateDataSource(IUmbracoBridgeServiceClient bridgeServiceClient)
    {
        _bridgeServiceClient = bridgeServiceClient;
        Id = UmbracoFormsCustomConstants.CallbackDateDropdownDataSource;
        Name = "Hotline Selectable Days";
        Description = "The days available to select when creating a new hotline call.";
        Icon = "icon-indent";
    }

    public override List<PreValue> GetPreValues(Field? field, Form? form)
    {
        try
        {
            var blackoutDates = GetBlackoutDatesFromApi().Result;
            return GenerateAvailableDates(blackoutDates);
        }
        catch (Exception ex)
        {
            throw new UmbracoDataSourceException("Failed to retrieve blackout dates for the hotline call days dropdown.", ex);
        }
    }

    public override List<Exception> ValidateSettings()
    {
        var exceptions = new List<Exception>();
        if (DaysToShow < 2 || DaysToShow > 10) exceptions.Add(new UmbracoDataSourceValidationException("Days to Show must be between 2 and 10."));
        if (AfternoonCutoffTime < 12 || AfternoonCutoffTime > 24) exceptions.Add(new UmbracoDataSourceValidationException("Same Day Afternoon Cutoff Time must be between 0 and 24."));
        if (MorningCutoffTime < 9 || MorningCutoffTime > 13) exceptions.Add(new UmbracoDataSourceValidationException("Same Day Morning Cutoff Time must be between 0 and 24."));
        return exceptions;
    }

    private async Task<List<OfficeClosureDto>> GetBlackoutDatesFromApi()
    {
        try
        {
            return [.. await _bridgeServiceClient.Calendar_GetOfficeClosureListAsync()];
        }
        catch
        {
            throw new UmbracoDataSourceException("Failed to retrieve blackout dates for the hotline call days dropdown.");
        }
    }

    private List<PreValue> GenerateAvailableDates(List<OfficeClosureDto> blackoutDates)
    {
        var result = new List<PreValue>();
        var currentDate = DateTime.Now;
        var startDate = currentDate.Hour >= AfternoonCutoffTime ? currentDate.Date.AddDays(1) : currentDate.Date;
        bool pastMorningCutOff = currentDate.Hour >= MorningCutoffTime;

        for (int i = 0; result.Count < DaysToShow && i < 30; i++)
        {
            var date = startDate.AddDays(i);
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday) continue;

            var closure = blackoutDates.Find(b => b.CalendarDate.Date == date.Date);
            if (closure == null || (!closure.OfficeClosed && (!closure.OfficeClosedAm || !closure.OfficeClosedPm)))
            {
                string window = string.Empty;

                // Check if it's the current day and past 11:45 AM
                bool isCurrentDay = date.Date == currentDate.Date;
                bool isPastAMCutoff = isCurrentDay && pastMorningCutOff;

                if ((!closure?.OfficeClosedAm ?? true) && !isPastAMCutoff) window += "AM";
                if (!closure?.OfficeClosedPm ?? true) window += "PM";

                if (!string.IsNullOrEmpty(window))
                {
                    result.Add(new PreValue
                    {
                        Id = (result.Count + 1).ToString(),
                        Caption = date.ToString("D"),
                        Value = $"{window}-{date:yyyy-MM-dd}" // AM-2024-12-31 or PM-2024-12-31 OR AMPM-2024-12-31
                    });
                }
            }
        }

        return result;
    }
}