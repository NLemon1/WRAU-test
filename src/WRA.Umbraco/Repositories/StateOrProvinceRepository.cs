using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

public class StateOrProvinceRepository
{
    // #todoeric: Figure out if we want to pull these, store them in umbraco etc.
    // or just use a static list.

    public IEnumerable<ExternalStateOrProvinceDto> GetAllStateOrProvinces()
    {
        return
        [
            new () { Id = new Guid("EB946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Alabama", Abbreviation = "AL", SortSeqn = 1 },
            new () { Id = new Guid("EC946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Alaska", Abbreviation = "AK", SortSeqn = 2 },
            new () { Id = new Guid("ED946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Arizona", Abbreviation = "AZ", SortSeqn = 3 },
            new () { Id = new Guid("EE946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Arkansas", Abbreviation = "AR", SortSeqn = 4 },
            new () { Id = new Guid("EF946FAC-E607-4106-AC10-D46B70770AD5"), Name = "California", Abbreviation = "CA", SortSeqn = 5 },
            new () { Id = new Guid("F0946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Colorado", Abbreviation = "CO", SortSeqn = 6 },
            new () { Id = new Guid("F1946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Connecticut", Abbreviation = "CT", SortSeqn = 7 },
            new () { Id = new Guid("F2946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Delaware", Abbreviation = "DE", SortSeqn = 8 },
            new () { Id = new Guid("F3946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Florida", Abbreviation = "FL", SortSeqn = 9 },
            new () { Id = new Guid("F4946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Georgia", Abbreviation = "GA", SortSeqn = 10 },
            new () { Id = new Guid("F5946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Hawaii", Abbreviation = "HI", SortSeqn = 11 },
            new () { Id = new Guid("F6946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Idaho", Abbreviation = "ID", SortSeqn = 12 },
            new () { Id = new Guid("F7946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Illinois", Abbreviation = "IL", SortSeqn = 13 },
            new () { Id = new Guid("F8946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Indiana", Abbreviation = "IN", SortSeqn = 14 },
            new () { Id = new Guid("F9946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Iowa", Abbreviation = "IA", SortSeqn = 15 },
            new () { Id = new Guid("FA946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Kansas", Abbreviation = "KS", SortSeqn = 16 },
            new () { Id = new Guid("FB946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Kentucky", Abbreviation = "KY", SortSeqn = 17 },
            new () { Id = new Guid("FC946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Louisiana", Abbreviation = "LA", SortSeqn = 18 },
            new () { Id = new Guid("FD946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Maine", Abbreviation = "ME", SortSeqn = 19 },
            new () { Id = new Guid("FE946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Maryland", Abbreviation = "MD", SortSeqn = 20 },
            new () { Id = new Guid("FF946FAC-E607-4106-AC10-D46B70770AD5"), Name = "Massachusetts", Abbreviation = "MA", SortSeqn = 21 },
            new () { Id = new Guid("00956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Michigan", Abbreviation = "MI", SortSeqn = 22 },
            new () { Id = new Guid("01956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Minnesota", Abbreviation = "MN", SortSeqn = 23 },
            new () { Id = new Guid("02956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Mississippi", Abbreviation = "MS", SortSeqn = 24 },
            new () { Id = new Guid("03956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Missouri", Abbreviation = "MO", SortSeqn = 25 },
            new () { Id = new Guid("04956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Montana", Abbreviation = "MT", SortSeqn = 26 },
            new () { Id = new Guid("05956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Nebraska", Abbreviation = "NE", SortSeqn = 27 },
            new () { Id = new Guid("06956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Nevada", Abbreviation = "NV", SortSeqn = 28 },
            new () { Id = new Guid("07956FAC-E607-4106-AC10-D46B70770AD5"), Name = "New Hampshire", Abbreviation = "NH", SortSeqn = 29 },
            new () { Id = new Guid("08956FAC-E607-4106-AC10-D46B70770AD5"), Name = "New Jersey", Abbreviation = "NJ", SortSeqn = 30 },
            new () { Id = new Guid("09956FAC-E607-4106-AC10-D46B70770AD5"), Name = "New Mexico", Abbreviation = "NM", SortSeqn = 31 },
            new () { Id = new Guid("0A956FAC-E607-4106-AC10-D46B70770AD5"), Name = "New York", Abbreviation = "NY", SortSeqn = 32 },
            new () { Id = new Guid("0B956FAC-E607-4106-AC10-D46B70770AD5"), Name = "North Carolina", Abbreviation = "NC", SortSeqn = 33 },
            new () { Id = new Guid("0C956FAC-E607-4106-AC10-D46B70770AD5"), Name = "North Dakota", Abbreviation = "ND", SortSeqn = 34 },
            new () { Id = new Guid("0D956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Ohio", Abbreviation = "OH", SortSeqn = 35 },
            new () { Id = new Guid("0E956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Oklahoma", Abbreviation = "OK", SortSeqn = 36 },
            new () { Id = new Guid("0F956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Oregon", Abbreviation = "OR", SortSeqn = 37 },
            new () { Id = new Guid("10956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Pennsylvania", Abbreviation = "PA", SortSeqn = 38 },
            new () { Id = new Guid("11956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Rhode Island", Abbreviation = "RI", SortSeqn = 39 },
            new () { Id = new Guid("12956FAC-E607-4106-AC10-D46B70770AD5"), Name = "South Carolina", Abbreviation = "SC", SortSeqn = 40 },
            new () { Id = new Guid("13956FAC-E607-4106-AC10-D46B70770AD5"), Name = "South Dakota", Abbreviation = "SD", SortSeqn = 41 },
            new () { Id = new Guid("14956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Tennessee", Abbreviation = "TN", SortSeqn = 42 },
            new () { Id = new Guid("15956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Texas", Abbreviation = "TX", SortSeqn = 43 },
            new () { Id = new Guid("16956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Utah", Abbreviation = "UT", SortSeqn = 44 },
            new () { Id = new Guid("17956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Vermont", Abbreviation = "VT", SortSeqn = 45 },
            new () { Id = new Guid("18956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Virginia", Abbreviation = "VA", SortSeqn = 46 },
            new () { Id = new Guid("19956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Washington", Abbreviation = "WA", SortSeqn = 47 },
            new () { Id = new Guid("1A956FAC-E607-4106-AC10-D46B70770AD5"), Name = "West Virginia", Abbreviation = "WV", SortSeqn = 48 },
            new () { Id = new Guid("1B956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Wisconsin", Abbreviation = "WI", SortSeqn = 49 },
            new () { Id = new Guid("1C956FAC-E607-4106-AC10-D46B70770AD5"), Name = "Wyoming", Abbreviation = "WY", SortSeqn = 50 }
        ];
    }
}
