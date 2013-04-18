using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Model;
using System.Threading;
using System.Web.Mail;
using System.Configuration;

namespace HopeLingerieServices.Services
{

    public class MailService
    {
        private static void SendMail(string from, string to, string subject, string body)
        {
            MailMessage Message = new MailMessage();
            Message.To = to;
            Message.From = from;
            Message.Subject = subject;
            Message.Body = body;
            Message.BodyFormat = MailFormat.Html;
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusing", "2");
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", ConfigurationManager.AppSettings["SendUserName"]);
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", ConfigurationManager.AppSettings["SendPassword"]);
            // Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", ConfigurationManager.AppSettings["SmtpServerPort"]);    
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserver", ConfigurationManager.AppSettings["SmtpServer"]);
            Message.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpusessl", Convert.ToBoolean(ConfigurationManager.AppSettings["SmtpUseSSL"]));

            SmtpMail.Send(Message);
        }
  

        public static void Send(string from, string to, string subject, string body)
        {
            try
            {
                ThreadStart job = delegate { SendMail(from, to, subject, body); };
                new Thread(job).Start();
            }
            catch { }
        }
    }
}
