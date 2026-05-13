import { useContext, useEffect, useRef, useState } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { MapPin, Phone, Package, Navigation, AlertCircle } from 'lucide-react';

const DeliveryMap = () => {
  const { orders } = useContext(RiderOrderContext);
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Active deliveries (pending + in_transit)
  const activeDeliveries = orders.filter(o => o.status === 'pending' || o.status === 'in_transit');

  // Initialize map on component mount
  useEffect(() => {
    // Load Leaflet dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          () => {
            // Default to Kathmandu if geolocation fails
            setCurrentLocation({ lat: 27.7172, lng: 85.3240 });
          }
        );
      } else {
        setCurrentLocation({ lat: 27.7172, lng: 85.3240 });
      }

      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (mapLoaded && currentLocation && mapRef.current && window.L) {
      // Clear previous map if exists
      if (mapRef.current._leaflet_map) {
        mapRef.current._leaflet_map.remove();
      }

      const map = window.L.map(mapRef.current).setView([currentLocation.lat, currentLocation.lng], 13);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Current location marker (blue)
      window.L.circleMarker([currentLocation.lat, currentLocation.lng], {
        radius: 8,
        fillColor: '#3b82f6',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map).bindPopup('Your Location');

      // Add delivery markers
      activeDeliveries.forEach((order) => {
        // Pickup marker (green)
        const pickupMarker = window.L.circleMarker([order.pickupLat, order.pickupLng], {
          radius: 6,
          fillColor: '#10b981',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        pickupMarker.bindPopup(`
          <div style="color: #000; font-size: 12px; width: 200px;">
            <strong>${order.id}</strong><br/>
            <strong>Pickup:</strong> ${order.pickupAddress}<br/>
            <strong>Item:</strong> ${order.itemDescription}
          </div>
        `);

        // Delivery marker (red)
        const deliveryMarker = window.L.circleMarker([order.deliveryLat, order.deliveryLng], {
          radius: 6,
          fillColor: '#ef4444',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        deliveryMarker.bindPopup(`
          <div style="color: #000; font-size: 12px; width: 200px;">
            <strong>${order.id}</strong><br/>
            <strong>Delivery:</strong> ${order.deliveryAddress}<br/>
            <strong>Customer:</strong> ${order.customerName}
          </div>
        `);

        // Draw line between pickup and delivery
        window.L.polyline(
          [[order.pickupLat, order.pickupLng], [order.deliveryLat, order.deliveryLng]],
          { color: '#8b5cf6', weight: 2, opacity: 0.6 }
        ).addTo(map);
      });

      mapRef.current._leaflet_map = map;
    }
  }, [mapLoaded, currentLocation, activeDeliveries]);

  return (
    <div className="w-full h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)]">
      {/* Map Container */}
      <div className="relative w-full h-full rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/15 text-sm text-white space-y-2">
          <p className="font-semibold mb-3">Legend</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
            <span>Pickup Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
            <span>Delivery Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-purple-500"></div>
            <span>Route</span>
          </div>
        </div>

        {/* Active Deliveries List */}
        <div className="absolute bottom-4 right-4 max-h-[50vh] overflow-y-auto bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/15 w-80">
          <h3 className="text-white font-semibold mb-3">Active Deliveries ({activeDeliveries.length})</h3>

          {activeDeliveries.length === 0 ? (
            <div className="text-white/60 text-sm">No active deliveries</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeDeliveries.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full text-left p-2 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="text-xs font-semibold text-[#f5d97c]">{order.id}</div>
                  <div className="text-xs text-white/70 mt-1 truncate">{order.customerName}</div>
                  <div className="text-xs text-white/60 mt-1">₹{order.amount}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Tooltip */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto mb-3"></div>
              <p className="text-white">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Order Info */}
      {selectedOrder && (
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{selectedOrder.id}</h3>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-white/60 hover:text-white text-xl"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-white/60">Customer</div>
              <div className="text-white font-semibold">{selectedOrder.customerName}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-white/60">Item</div>
              <div className="text-white font-semibold">{selectedOrder.itemDescription}</div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Pickup
              </div>
              <div className="text-white">{selectedOrder.pickupAddress}</div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 text-red-400" />
                Delivery
              </div>
              <div className="text-white">{selectedOrder.deliveryAddress}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-white/60">Amount</div>
              <div className="text-lg font-bold text-[#f5d97c]">₹{selectedOrder.amount}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-white/60">Status</div>
              <div className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                selectedOrder.status === 'in_transit'
                  ? 'bg-blue-500/20 text-blue-200'
                  : 'bg-yellow-500/20 text-yellow-200'
              }`}>
                {selectedOrder.status === 'in_transit' ? 'In Transit' : 'Pending'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryMap;
