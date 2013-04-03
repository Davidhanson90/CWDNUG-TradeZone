namespace TradeZone
{
    using server.AppStart;

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            SignalrRoutingHttpConfig.RegisterRoutes();
        }
    }
}