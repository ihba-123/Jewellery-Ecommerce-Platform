import { useContext, useEffect, useRef, useState } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { MapPin, Package, Navigation, AlertCircle, Loader } from 'lucide-react';

const DeliveryMap = () => {
  const { orders } = useContext(RiderOrderContext);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [leafletReady, setLeafletReady] = useState(false);

  const activeDeliveries = orders.filter(o => o.status === 'pending' || o.status === 'in_transit');

  // Load Leaflet library
  useEffect(() => {
    if (leafletReady) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;

    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      setLeafletReady(true);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [leafletReady]);

  // Get current location
  useEffect(() => {
    if (!leafletReady) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setLocationError('Using default location');
          setCurrentLocation({ lat: 27.7172, lng: 85.3240 });
        }
      );
    } else {
      setLocationError('Geolocation not available');
      setCurrentLocation({ lat: 27.7172, lng: 85.3240 });
    }
  }, [leafletReady]);

  // Initialize map
  useEffect(() => {
    if (!leafletReady || !currentLocation || !mapRef.current || !window.L) return;

    // Destroy old map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = window.L.map(mapRef.current, {
        preferCanvas: true,
      }).setView([currentLocation.lat, currentLocation.lng], 13);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Current location
      window.L.circleMarker([currentLocation.lat, currentLocation.lng], {
        radius: 10,
        fillColor: '#3b82f6',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map).bindPopup('📍 Your Location');

      // Glow
      window.L.circleMarker([currentLocation.lat, currentLocation.lng], {
        radius: 16,
        fillColor: 'none',
        color: '#3b82f6',
        weight: 2,
        opacity: 0.3,
        interactive: false,
      }).addTo(map);

      // Add markers
      activeDeliveries.forEach((order) => {
        window.L.circleMarker([order.pickupLat, order.pickupLng], {
          radius: 8,
          fillColor: '#10b981',
          color: '#fff',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map).bindPopup(`<div style="font-size:11px;color:#000;"><strong>📦 PICKUP</strong><br/>${order.id}</div>`);

        window.L.circleMarker([order.deliveryLat, order.deliveryLng], {
          radius: 8,
          fillColor: '#ef4444',
          color: '#fff',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map).bindPopup(`<div style="font-size:11px;color:#000;"><strong>📍 DELIVERY</strong><br/>${order.id}</div>`);

        window.L.polyline(
          [[order.pickupLat, order.pickupLng], [order.deliveryLat, order.deliveryLng]],
          { color: '#8b5cf6', weight: 2.5, opacity: 0.8, dashArray: '5, 5' }
        ).addTo(map);
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    } catch (error) {
      console.error('Map error:', error);
    }
  }, [leafletReady, currentLocation, activeDeliveries]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="relative w-full flex-1 rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 overflow-hidden shadow-xl min-h-[500px]">
        {locationError && (
          <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 rounded-lg px-4 py-2 text-xs z-40 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {locationError}
          </div>
        )}

        <div ref={mapRef} className="w-full h-full rounded-2xl" />

        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-sm text-white space-y-3 shadow-lg max-w-sm z-30">
          <p className="font-bold text-[#f5d97c]">📍 Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              <span>Pickup</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <span>Delivery</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 max-h-[45vh] overflow-y-auto bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 w-72 shadow-lg z-30">
          <h3 className="text-white font-bold mb-3">Active Routes ({activeDeliveries.length})</h3>
          {activeDeliveries.length === 0 ? (
            <div className="text-white/60 text-sm text-center py-4">No active deliveries</div>
          ) : (
            <div className="space-y-2">
              {activeDeliveries.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedOrder?.id === order.id
                      ? 'bg-white/15 border border-[#f5d97c]/50'
                      : 'bg-white/8 border border-white/10 hover:bg-white/12'
                  }`}
                >
                  <div className="text-xs font-bold text-[#f5d97c]">{order.id}</div>
                  <div className="text-xs text-white/80 font-medium mt-1">{order.customerName}</div>
                  <div className="text-xs text-white/60 mt-1">₹{order.amount}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 rounded-2xl">
            <div className="text-center">
              <Loader className="h-8 w-8 text-white animate-spin mx-auto mb-3" />
              <p className="text-white font-medium">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md p-5 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedOrder.id}</h3>
              <p className="text-sm text-white/70 mt-1 font-medium">{selectedOrder.customerName}</p>
            </div>
            <button onClick={() => setSelectedOrder(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }} className="text-white/60 hover:text-white">✕</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 font-medium mb-1">Item</div>
              <div className="text-sm font-semibold text-white truncate">{selectedOrder.itemDescription}</div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 font-medium mb-1">Amount</div>
              <div className="text-sm font-bold text-[#f5d97c]">₹{selectedOrder.amount}</div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 font-medium mb-1">Status</div>
              <div className={`text-xs font-semibold px-2 py-1 rounded w-fit ${selectedOrder.status === 'in_transit' ? 'bg-blue-500/20 text-blue-200' : 'bg-yellow-500/20 text-yellow-200'}`}>
                {selectedOrder.status === 'in_transit' ? '🚗 Transit' : '📦 Pending'}
              </div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 font-medium mb-1">Date</div>
              <div className="text-sm font-semibold text-white">{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                Pickup
              </div>
              <div className="text-sm font-semibold text-white">{selectedOrder.pickupAddress}</div>
            </div>
            <div className="rounded-lg bg-red-500/10 p-3 border border-red-500/20">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1 font-medium">
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
