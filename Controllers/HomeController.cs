using Microsoft.AspNetCore.Mvc;

namespace vuetify_ts_aspnetcore_starter.Controllers
{
    public class HomeController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return
            View();
        }
    }
}