namespace DocumentLibrary.Backend.Models;

public record Document
{
    public string Name { get; set; }
    public string Type { get; set; }
    public DateTime UploadDate { get; set; }
}