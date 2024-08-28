namespace WRA.Umbraco.Forms.Models;
public class LegalHotlineFormSubmissionModel
{
    public string? Question { get; set; }

    public string? CallbackPreference { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? CallbackDate { get; set; }

    public string? CallbackTimeWindow { get; set; }

    public bool LetterRequested { get; set; }
}
