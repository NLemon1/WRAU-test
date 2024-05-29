using System;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class ExternalCourseDto
    {
        public Guid MemberId { get; set; }
        public string IMISId { get; set; }
        public string Program { get; set; }
        public string? Component { get; set; }
        public string? Status { get; set; }
        public DateTime? StatusDate { get; set; }
        public DateTime? GoodThruDate { get; set; }
        public string? Location { get; set; }
        public int? CertificateSequence { get; set; }
        public int? LicenseType { get; set; }
        public int? LicenseNumber { get; set; }
        public string? CredentialHolderId { get; set; }
        public string? CourseLauncherUrl { get; set; }
        public string? Sku { get; set; }
        public Guid ProductId { get; set; }
        public decimal? UnitsRequired { get; set; } = 0;
        public decimal? UnitsEarned { get; set; } = 0;
        public int SortSequence { get; set; } = 0;
    }
}