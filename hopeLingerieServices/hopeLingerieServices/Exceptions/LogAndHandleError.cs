using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web;
using HopeLingerieServices.Model;

namespace HopeLingerieServices.Exceptions
{

    public class LogAndHandleErrorAttribute : HandleErrorAttribute
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public override void OnException(System.Web.Mvc.ExceptionContext filterContext)
        {
            base.OnException(filterContext);

            //OVERRIDE THE 500 ERROR  
            filterContext.HttpContext.Response.StatusCode = 200;
            
            var errorLog = new ErrorLog { 
                        AddedDate=System.DateTime.Now, 
                        StackTrace = filterContext.Exception.StackTrace, 
                        Message = filterContext.Exception.Message  };

            hopeLingerieEntities.ErrorLogs.AddObject(errorLog);

            hopeLingerieEntities.SaveChanges();
        }

      
    }
}