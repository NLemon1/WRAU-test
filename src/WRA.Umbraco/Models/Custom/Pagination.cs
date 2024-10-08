namespace WRA.Umbraco.Models.Custom;

public class Pagination
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }

    public Pagination()
    {
        PageNumber = 1;
        PageSize = 15;
    }

    public Pagination(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber < 1 ? 1 : pageNumber;
        PageSize = pageSize > 10 ? 10 : pageSize;
    }
}