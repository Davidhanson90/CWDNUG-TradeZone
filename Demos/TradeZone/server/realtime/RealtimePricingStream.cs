using System.Linq;
using System.Runtime.Remoting.Contexts;
using TradeZone.server.Model;
using TradeZone.server.data;

namespace TradeZone.server.realtime
{
    using System;
    using System.Reactive.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNet.SignalR;


    public class RealtimePricingStream : PersistentConnection
    {
        private IDisposable _stream;
        private string _connectionId;
        private int _basePrice;
        private readonly Random _random = new Random(DateTime.Now.Millisecond);
        private readonly TimeSpan PriceInterval = TimeSpan.FromMilliseconds(10);
        private Company _company;

        protected override Task OnConnected(IRequest request, string connectionId)
        {
            var symbol = request.QueryString["symbol"];
            _company = CompanyRepository.Instance.Items.First(c => c.symbol == symbol);

            _connectionId = connectionId;
            _basePrice = (int) _company.prices.Last();

            Start();

            return base.OnConnected(request, connectionId);
        }

        private void Start()
        {
            _stream = Observable.Interval(PriceInterval)
                    .Subscribe(i => Pump());
        }

        private void Pump()
        {
            var basePrice = _basePrice;
            var flip = _random.Next(1, 100);
            if (flip > 80)
            {
                ++basePrice;
            }

            var price = basePrice + (decimal)(_random.Next(1, 99) * 0.1);
            //_company.prices.Add(price);

            Connection.Send(_connectionId, price);
        }

        protected override Task OnDisconnected(IRequest request, string connectionId)
        {
            Stop();

            return base.OnDisconnected(request, connectionId);
        }

        private void Stop()
        {
            if (_stream != null)
            {
                _stream.Dispose();
            }
        }
    }
}