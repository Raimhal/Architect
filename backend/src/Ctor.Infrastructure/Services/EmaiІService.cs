using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Application.Common.Interfaces;
using Ctor.Application.Common.Models;
using Ctor.Application.DTOs.EmailDTos;
using Mailjet.Client;
using Mailjet.Client.Resources;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace Ctor.Infrastructure.Services;
public class EmaiІService : IEmailService
{
    private readonly MailSetting _mailSetting;
    public EmaiІService(IOptions<MailSetting> mailSetting)
    {
        _mailSetting = mailSetting.Value;
    }
    public async Task SendAsync(IEnumerable<EmailDTO> emails, string subject, string text, string html)
    {
        if (_mailSetting == null)
        {
            return;
        }

        MailjetClient client = new MailjetClient(
            _mailSetting.ApiKey,
            _mailSetting.ApiSecret
            );

        var request = GetMailjetRequest(emails, subject, text, html);

        MailjetResponse response = await client.PostAsync(request);

        if (response.IsSuccessStatusCode)
        {
            Console.WriteLine(string.Format("Total: {0}, Count: {1}\n", response.GetTotal(), response.GetCount()));
            Console.WriteLine(response.GetData());
        }
        else
        {
            Console.WriteLine(string.Format("StatusCode: {0}\n", response.StatusCode));
            Console.WriteLine(string.Format("ErrorInfo: {0}\n", response.GetErrorInfo()));
            Console.WriteLine(response.GetData());
            Console.WriteLine(string.Format("ErrorMessage: {0}\n", response.GetErrorMessage()));
        }
    }
    private MailjetRequest GetMailjetRequest(IEnumerable<EmailDTO> emails, string subject, string text, string html)
    {
        var from = new JObject
        {
             {"Email", _mailSetting.FromEmail},
             {"Name", _mailSetting.DiplayName}
        };

        var to = new JArray();
        foreach (var email in emails)
        {
            var emailJObject = new JObject {

                {"Email", email.Email},
                {"Name",email.Name}

              };
            to.Add(emailJObject);
        }

        var bodyRequest = new JArray {
           new JObject {

               {"From", from},
               {"To",to},
               {"Subject",subject},
               {"TextPart",text},
               {"HTMLPart",html},
               {"CustomID","AppGettingStartedTest"}

           }
      };

        MailjetRequest request = new MailjetRequest
        {
            Resource = SendV31.Resource,
        }
        .Property(Send.Messages, bodyRequest);

        return request;
    }
}
