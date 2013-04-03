
namespace TradeZone.server.AppStart
{
    using System.Web.Routing;
    using realtime;

    public static class SignalrRoutingHttpConfig
    {
        public static void RegisterRoutes()
        {
            RouteTable.Routes.MapConnection<RealtimePricingStream>("stream", "/stream");
        }
    }
}