using Microsoft.AspNetCore.Mvc;

namespace DocumentLibrary.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class DocumentsController : ControllerBase
{
    private readonly ILogger<DocumentsController> _logger;

    public DocumentsController(ILogger<DocumentsController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IActionResult UploadDocument(IFormFile file)
    {
        // Handle the document upload logic here
        // Save the file to the desired location
        // Extract metadata like name, type, upload date, etc.
        return Ok();
    }
}
