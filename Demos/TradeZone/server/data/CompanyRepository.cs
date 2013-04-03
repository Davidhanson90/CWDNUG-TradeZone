using System;

namespace TradeZone.server.data
{
    using System.Collections.Generic;
    using System.Linq;
    using Model;

    public class CompanyRepository
    {
        private static readonly Lazy<CompanyRepository> _instance = new Lazy<CompanyRepository>(() => new CompanyRepository());
        private static List<Company> _companies;

        protected CompanyRepository()
        {
            Load();
        }

        public IEnumerable<Company> Items
        {
            get { return _companies; }
        } 

        public static CompanyRepository Instance
        {
            get { return _instance.Value; }
        }

        private void Load()
        {
            _companies = new[] {
                new Company { name = "Microsoft", symbol = "MSFT", prices = new[] { 8.32m, 8.67m, 8.56m }.ToList(), volume = 134456 },
                new Company { name = "Google", symbol = "GOOG", prices = new[] { 5.32m, 5.56m, 5.10m }.ToList(), volume = 122456 },
                new Company { name = "Facebook", symbol = "FB", prices = new[] { 2.56m, 2.67m, 2.65m }.ToList(), volume = 455000 },
                new Company { name = "Apple", symbol = "AAPL", prices = new[] { 4.32m, 4.56m, 4.67m, }.ToList(), volume = 32010 },
            }.ToList();
        }
    }
}
