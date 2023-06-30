using DocumentLibrary.Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DocumentLibrary.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController : ControllerBase
{
    private const string UploadDirectory = "upload";

    public DocumentsController()
    {
    }

    /// <summary>
    /// Status: Stubbed
    /// </summary>
    /// <returns>Dummy data</returns>
    [HttpGet]
    public IActionResult GetDocumentList()
    {
        // Get the list of available documents from your data source
        List<Document> documents = GetAvailableDocuments();

        return Ok(documents);
    }

    private List<Document> GetAvailableDocuments()
    {
        var documents = new List<Document>
        {
            new Document
            {
                Name = "Document 1",
                Type = "PDF",
                UploadDate = DateTime.Now.AddDays(-1),
            },
            new Document
            {
                Name = "Document 2",
                Type = "Word",
                UploadDate = DateTime.Now.AddDays(-2),
            }
        };

        return documents;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file selected.");
        }

        if (!IsFileTypeValid(file))
        {
            return BadRequest("Invalid file type. Please select a PDF, Excel, Word, TXT, JPEG, or PNG file.");
        }

        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), UploadDirectory);
        Directory.CreateDirectory(uploadPath); // Create the directory if it doesn't exist

        var filePath = Path.Combine(uploadPath, file.FileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Ok();
    }

    private bool IsFileTypeValid(IFormFile file)
    {
        var allowedFileTypes = new[] { ".pdf", ".xls", ".xlsx", ".doc", ".docx", ".txt", ".jpg", ".jpeg", ".png" };

        var fileExtension = Path.GetExtension(file.FileName);

        return allowedFileTypes.Contains(fileExtension.ToLower());
    }
}
