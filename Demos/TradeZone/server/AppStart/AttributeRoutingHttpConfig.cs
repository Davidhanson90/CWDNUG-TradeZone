

using TradeZone;
using TradeZone.server.AppStart;

[assembly: WebActivator.PreApplicationStartMethod(typeof(AttributeRoutingHttpConfig), "Start")]
namespace TradeZone.server.AppStart
{
    using System.Web.Http;
    using AttributeRouting.Web.Http.WebHost;

    public static class AttributeRoutingHttpConfig
    {
        public static void RegisterRoutes(HttpRouteCollection routes)
        {
            routes.MapHttpAttributeRoutes();
        }

        public static void Start()
        {
            RegisterRoutes(GlobalConfiguration.Configuration.Routes);
        }
    }
}