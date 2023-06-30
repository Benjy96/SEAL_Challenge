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
    /// Status: Reading from server storage
    /// </summary>
    /// <returns>Saved files' metadata</returns>
    [HttpGet]
    public IActionResult GetDocumentList()
    {
        // Get the list of available documents from your data source
        List<Document> documents = GetAvailableDocuments();

        return Ok(documents);
    }

    private List<Document> GetAvailableDocuments()
    {
        var documents = new List<Document>();

        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), UploadDirectory);

        // Get all files in the upload directory
        var files = Directory.GetFiles(uploadPath);

        foreach (var filePath in files)
        {
            var fileInfo = new FileInfo(filePath);

            var document = new Document
            {
                Name = fileInfo.Name,
                Type = Path.GetExtension(fileInfo.Name).TrimStart('.'),
                UploadDate = fileInfo.LastWriteTime
            };

            documents.Add(document);
        }

        return documents;
    }

    [HttpGet("{fileName}")]
    public IActionResult Download(string fileName)
    {
        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), UploadDirectory);
        var filePath = Path.Combine(uploadPath, fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound();
        }

        var fileBytes = System.IO.File.ReadAllBytes(filePath);
        var fileType = GetFileType(fileName);

        return File(fileBytes, fileType, fileName);
    }

    private string GetFileType(string fileName)
    {
        var extension = Path.GetExtension(fileName);

        // Map file extensions to MIME types
        switch (extension.ToLower())
        {
            case ".pdf":
                return "application/pdf";
            case ".xls":
            case ".xlsx":
                return "application/vnd.ms-excel";
            case ".doc":
            case ".docx":
                return "application/msword";
            case ".txt":
                return "text/plain";
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            default:
                return "application/octet-stream";
        }
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
