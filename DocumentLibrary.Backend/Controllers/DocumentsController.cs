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
