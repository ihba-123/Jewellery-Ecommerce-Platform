import { useContext, useEffect, useRef, useState } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { MapPin, Package, Navigation, AlertCircle, Loader } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBUIbAx7NCu1JN44o5JWlPEykJA_DSCtZE';

const DeliveryMap = () => {
  const { orders } = useContext(RiderOrderContext);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 27.7172, lng: 85.3240 });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const activeDeliveries = orders.filter(o => o.status === 'pending' || o.status === 'in_transit');

  // Load Google Maps Script
  useEffect(() => {
    if (window.google?.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.maps) {
        initializeMap();
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps');
      setLocationError('Failed to load maps - check API key');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setLocationError('Using default location');
        }
      );
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    // Clear existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null;
    }

    try {
      // Create map
      const mapOptions = {
        zoom: 13,
        center: currentLocation,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Current location marker
      new window.google.maps.Marker({
        position: currentLocation,
        map: map,
        title: 'Your Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
      });

      // Add delivery markers and routes
      activeDeliveries.forEach((order) => {
        const pickupLatLng = { lat: order.pickupLat, lng: order.pickupLng };
        const deliveryLatLng = { lat: order.deliveryLat, lng: order.deliveryLng };

        // Pickup marker
        new window.google.maps.Marker({
          position: pickupLatLng,
          map: map,
          title: `Pickup - ${order.id}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#10b981',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        }).addListener('click', () => setSelectedOrder(order));

        // Delivery marker
        new window.google.maps.Marker({
          position: deliveryLatLng,
          map: map,
          title: `Delivery - ${order.id}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#ef4444',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        }).addListener('click', () => setSelectedOrder(order));

        // Route polyline
        new window.google.maps.Polyline({
          path: [pickupLatLng, deliveryLatLng],
          geodesic: true,
          strokeColor: '#8b5cf6',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          map: map,
        });
      });

      setMapLoaded(true);
    } catch (error) {
      console.error('Map error:', error);
      setLocationError('Error loading map');
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="relative w-full flex-1 rounded-2xl border border-white/15 overflow-hidden shadow-xl min-h-[500px]">
        {locationError && (
          <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 rounded-lg px-4 py-2 text-xs z-40 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {locationError}
          </div>
        )}

        {/* Map Container */}
        <div ref={mapRef} className="w-full h-full rounded-2xl bg-gray-200" />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-xl p-4 border border-white/20 text-sm shadow-lg max-w-sm z-30">
          <p className="font-bold text-[#f5d97c] mb-3">📍 Map Legend</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white/50"></div>
              <span className="text-gray-800 text-xs font-medium">Your Location</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white/50"></div>
              <span className="text-gray-800 text-xs font-medium">Pickup Point</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white/50"></div>
              <span className="text-gray-800 text-xs font-medium">Delivery Point</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-purple-500"></div>
              <span className="text-gray-800 text-xs font-medium">Route</span>
            </div>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="absolute bottom-4 right-4 max-h-[45vh] overflow-y-auto bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-xl p-4 border border-white/20 w-72 shadow-lg z-30">
          <h3 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#f5d97c]" />
            Active Routes ({activeDeliveries.length})
          </h3>

          {activeDeliveries.length === 0 ? (
            <div className="text-gray-600 text-sm text-center py-4">
              <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              No active deliveries
            </div>
          ) : (
            <div className="space-y-2">
              {activeDeliveries.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedOrder?.id === order.id
                      ? 'bg-[#f5d97c]/20 border border-[#f5d97c]/50 shadow-lg'
                      : 'bg-white/50 border border-white/30 hover:bg-white/70'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-lg">
                      {order.status === 'in_transit' ? '🚗' : '📦'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#f5d97c]">{order.id}</div>
                      <div className="text-xs text-gray-700 font-medium mt-1 truncate">{order.customerName}</div>
                      <div className="text-xs text-gray-600 mt-1">₹{order.amount}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20 rounded-2xl">
            <div className="text-center bg-white/80 p-6 rounded-lg">
              <Loader className="h-8 w-8 text-[#f5d97c] animate-spin mx-auto mb-3" />
              <p className="text-gray-800 font-medium">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Order Info */}
      {selectedOrder && (
        <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md p-5 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedOrder.id}</h3>
              <p className="text-sm text-white/70 mt-1 font-medium">{selectedOrder.customerName}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-white/60 hover:text-white text-2xl transition-colors"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 mb-1 font-medium">Item</div>
              <div className="text-sm font-semibold text-white truncate">{selectedOrder.itemDescription}</div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 mb-1 font-medium">Amount</div>
              <div className="text-sm font-bold text-[#f5d97c]">₹{selectedOrder.amount}</div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 mb-1 font-medium">Status</div>
              <div className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
                selectedOrder.status === 'in_transit'
                  ? 'bg-blue-500/20 text-blue-200'
                  : 'bg-yellow-500/20 text-yellow-200'
              }`}>
                {selectedOrder.status === 'in_transit' ? '🚗 Transit' : '📦 Pending'}
              </div>
            </div>
            <div className="rounded-lg bg-white/8 p-3 border border-white/10">
              <div className="text-xs text-white/70 mb-1 font-medium">Date</div>
              <div className="text-sm font-semibold text-white">{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
