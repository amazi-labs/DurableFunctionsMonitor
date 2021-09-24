using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.DurableTask.ContextImplementations;
using Microsoft.Azure.WebJobs.Extensions.DurableTask.Options;
using Microsoft.Extensions.Logging;

namespace DurableFunctionsMonitor.DotNetBackend
{
    // Base class for all HTTP request handlers.
    // Provides tooling for authZ and error handling.
    public class HttpHandlerBase
    {
        // Default instance of IDurableClientFactory, injected via ctor 
        private readonly IDurableClientFactory _durableClientFactory;

        public HttpHandlerBase(IDurableClientFactory durableClientFactory)
        {
            this._durableClientFactory = durableClientFactory;
        }

        // Applies authN/authZ rules and handles incoming HTTP request. Also creates IDurableClient (when needed) and does error handling.
        protected async Task<IActionResult> HandleAuthAndErrors(IDurableClient defaultDurableClient, HttpRequest req, string connName, string hubName, ILogger log, Func<IDurableClient, Task<IActionResult>> todo)
        {
            return await Globals.HandleErrors(req, log, async () => { 

                await Auth.ValidateIdentityAsync(req.HttpContext.User, req.Headers, Globals.CombineConnNameAndHubName(connName, hubName));

                // For default storage connections using default durableClient, injected normally, as a parameter.
                // Only using IDurableClientFactory for custom connections, just in case.
                var durableClient = Globals.IsDefaultConnectionStringName(connName) ? 
                    defaultDurableClient : 
                    this._durableClientFactory.CreateClient(new DurableClientOptions
                    {
                        TaskHub = hubName,
                        ConnectionName = Globals.GetFullConnectionStringEnvVariableName(connName)
                    });

                return await todo(durableClient);
            });
        }
    }
}
