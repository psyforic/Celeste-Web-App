using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Mail;

namespace Celeste
{
    public class Emailer
    {
        public static void Send(string to, string subject, string body, bool isBodyHtml)
        {

            MailAddress toEmail = new MailAddress(to);
            MailAddress from = new MailAddress("no-reply@celestedaylight.co.za");

            MailMessage mail = new MailMessage(from, toEmail);

            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = isBodyHtml;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.sendgrid.net";
            smtp.Port = 587;
            smtp.Credentials = new NetworkCredential("apikey", "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");
            smtp.Send(mail);
        }
    }
}
