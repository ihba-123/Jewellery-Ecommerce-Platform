import { useContext, useEffect, useRef, useState } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { MapPin, Phone, Package, Navigation, AlertCircle, Loader } from 'lucide-react';

const DeliveryMap = () => {
  const { orders } = useContext(RiderOrderContext);
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationError, setLocationError] = useState(null);

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
          (error) => {
            setLocationError('Location access denied. Using default location.');
            // Default to Kathmandu if geolocation fails
            setCurrentLocation({ lat: 27.7172, lng: 85.3240 });
          }
        );
      } else {
        setLocationError('Geolocation not supported. Using default location.');
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

      const map = window.L.map(mapRef.current).setView([currentLocation.lat, currentLocation.lng], 14);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Current location marker with glow effect (blue)
      const currentCircle = window.L.circleMarker([currentLocation.lat, currentLocation.lng], {
        radius: 10,
        fillColor: '#3b82f6',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);

      currentCircle.bindPopup('<div style="color:#000; font-weight:bold; text-align:center;">📍 Your Location</div>');

      // Add glow circle around current location
      window.L.circleMarker([currentLocation.lat, currentLocation.lng], {
        radius: 16,
        fillColor: 'none',
        color: '#3b82f6',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0,
      }).addTo(map);

      // Add delivery markers
      activeDeliveries.forEach((order, index) => {
        // Pickup marker (green)
        const pickupMarker = window.L.circleMarker([order.pickupLat, order.pickupLng], {
          radius: 8,
          fillColor: '#10b981',
          color: '#fff',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        pickupMarker.bindPopup(`
          <div style="color: #000; font-size: 12px; width: 220px;">
            <strong style="color: #10b981;">📦 PICKUP - ${order.id}</strong><br/>
            <strong>From:</strong> ${order.pickupAddress}<br/>
            <strong>Item:</strong> ${order.itemDescription}<br/>
            <strong>₹${order.amount}</strong>
          </div>
        `);

        // Delivery marker (red)
        const deliveryMarker = window.L.circleMarker([order.deliveryLat, order.deliveryLng], {
          radius: 8,
          fillColor: '#ef4444',
          color: '#fff',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        deliveryMarker.bindPopup(`
          <div style="color: #000; font-size: 12px; width: 220px;">
            <strong style="color: #ef4444;">📍 DELIVERY - ${order.id}</strong><br/>
            <strong>To:</strong> ${order.deliveryAddress}<br/>
            <strong>Customer:</strong> ${order.customerName}<br/>
            <strong>₹${order.amount}</strong>
          </div>
        `);

        // Draw animated route line between pickup and delivery
        window.L.polyline(
          [[order.pickupLat, order.pickupLng], [order.deliveryLat, order.deliveryLng]],
          {
            color: '#8b5cf6',
            weight: 2.5,
            opacity: 0.8,
            dashArray: '5, 5',
            lineJoin: 'round'
          }
        ).addTo(map);

        // Add order number label on the line midpoint
        const midLat = (order.pickupLat + order.deliveryLat) / 2;
        const midLng = (order.pickupLng + order.deliveryLng) / 2;

        window.L.marker([midLat, midLng], {
          icon: window.L.divIcon({
            className: 'order-label',
            html: `<div style="background: #8b5cf6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${order.id}</div>`,
            iconSize: [50, 30],
            iconAnchor: [25, 15]
          })
        }).addTo(map);
      });

      mapRef.current._leaflet_map = map;
    }
  }, [mapLoaded, currentLocation, activeDeliveries]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Map Container */}
      <div className="relative w-full flex-1 rounded-2xl border border-white/15 bg-white/5 overflow-hidden shadow-xl mb-4">
        {locationError && (
          <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 rounded-lg px-4 py-2 text-xs z-40 flex items-center gap-2 max-w-xs">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {locationError}
          </div>
        )}

        <div ref={mapRef} className="w-full h-full" />

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-sm text-white space-y-3 shadow-lg max-w-sm">
          <p className="font-bold text-base text-[#f5d97c] mb-3">Route Legend</p>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>
              <span className="text-white/90">Your Current Location</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg"></div>
              <span className="text-white/90">Pickup Point</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg"></div>
              <span className="text-white/90">Delivery Point</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-purple-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #8b5cf6 0px, #8b5cf6 5px, transparent 5px, transparent 10px)' }}></div>
              <span className="text-white/90">Route</span>
            </div>
          </div>
        </div>

        {/* Active Deliveries List */}
        <div className="absolute bottom-4 right-4 max-h-[45vh] overflow-y-auto bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 w-72 shadow-lg">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#f5d97c]" />
            Active Routes ({activeDeliveries.length})
          </h3>

          {activeDeliveries.length === 0 ? (
            <div className="text-white/60 text-sm p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-white/30" />
              No active deliveries
            </div>
          ) : (
            <div className="space-y-2">
              {activeDeliveries.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-3 rounded-lg transition-all border ${
                    selectedOrder?.id === order.id
                      ? 'bg-white/15 border-[#f5d97c]/50 shadow-lg'
                      : 'bg-white/8 border-white/10 hover:bg-white/12'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-lg">
                      {order.status === 'in_transit' ? '🚗' : '📦'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#f5d97c]">{order.id}</div>
                      <div className="text-xs text-white/70 truncate mt-0.5">{order.customerName}</div>
                      <div className="text-xs text-white/50 mt-1">₹{order.amount}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="text-center">
              <Loader className="h-8 w-8 text-white animate-spin mx-auto mb-3" />
              <p className="text-white font-medium">Initializing map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Order Info */}
      {selectedOrder && (
        <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-5 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedOrder.id}</h3>
              <p className="text-sm text-white/60 mt-1">{selectedOrder.customerName}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-white/60 hover:text-white text-2xl"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/60 mb-1">Item</div>
              <div className="text-sm font-semibold text-white truncate">{selectedOrder.itemDescription}</div>
            </div>

            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/60 mb-1">Amount</div>
              <div className="text-sm font-bold text-[#f5d97c]">₹{selectedOrder.amount}</div>
            </div>

            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/60 mb-1">Status</div>
              <div className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
                selectedOrder.status === 'in_transit'
                  ? 'bg-blue-500/20 text-blue-200'
                  : 'bg-yellow-500/20 text-yellow-200'
              }`}>
                {selectedOrder.status === 'in_transit' ? '🚗 Transit' : '📦 Pending'}
              </div>
            </div>

            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/60 mb-1">Date</div>
              <div className="text-sm font-semibold text-white">{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                Pickup
              </div>
              <div className="text-sm font-semibold text-white">{selectedOrder.pickupAddress}</div>
            </div>

            <div className="rounded-lg bg-red-500/10 p-3 border border-red-500/20">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                Delivery
              </div>
              <div className="text-sm font-semibold text-white">{selectedOrder.deliveryAddress}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryMap;
