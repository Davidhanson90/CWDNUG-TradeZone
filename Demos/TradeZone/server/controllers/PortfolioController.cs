namespace TradeZone.server.controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using AttributeRouting;
    using AttributeRouting.Web.Http;
    using Model;
    using data;

    [RoutePrefix("api/portfolio")]
    public class PortfolioController : ApiController
    {
        private readonly CompanyRepository _repository = CompanyRepository.Instance;

        [GET("getBySymbol/{symbol}")]
        public Company GetBySymbol(string symbol)
        {
            return _repository.Items.FirstOrDefault(c => c.symbol.Equals(symbol.Trim(), StringComparison.OrdinalIgnoreCase));
        }

        [GET("{portfolioId}")]
        public IEnumerable<Company> GetPortfolio(string portfolioId)
        {
            return _repository.Items.Take(2).ToArray();
        }
    }
}