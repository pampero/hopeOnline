using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HopeLingerieAdmin.Controllers.Landing
{
    public partial class LandingController : Controller
    {
        //
        // GET: /Landing/

        public virtual ActionResult Index()
        {
            return View("LandingIndex");
        }

    }
}
