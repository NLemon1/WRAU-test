using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Extensions;
public struct DateTimeRange
{
    public DateTime Start { get; }
    public DateTime End { get; }

    public DateTimeRange(DateTime start, DateTime end)
    {
        if (end < start)
        {
            throw new ArgumentException("End time must be greater than or equal to start time.");
        }

        Start = start;
        End = end;
    }

    public string FormatTimeRange()
    {
        return $"{Start.ToString("h:mm tt", CultureInfo.InvariantCulture)} - {End.ToString("h:mm tt", CultureInfo.InvariantCulture)}";
    }

    public override string ToString() => $"Start: {Start}, End: {End}";
}
