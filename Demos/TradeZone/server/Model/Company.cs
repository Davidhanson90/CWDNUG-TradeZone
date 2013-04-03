using System.Collections.Generic;

namespace TradeZone.server.Model
{
    public class Company : Entity
    {
        public string name { get; set; }
        public string symbol { get; set; }
        public List<decimal> prices { get; set; }
        public decimal volume { get; set; }
    }
}
