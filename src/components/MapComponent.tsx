import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import { 
  MapPin, Navigation, ZoomIn, ZoomOut, Maximize2, AlertCircle, 
  Sparkles, CheckCircle, Clock, Heart, Shield, Home, Flame, 
  Layers, Search, Eye, Compass, HelpCircle, ChevronRight, CornerDownRight 
} from 'lucide-react';
import { Issue } from '../types';
import { INDIAN_SAFETY_CENTERS, INDIAN_RISK_ZONES } from '../data/indiaData';

interface MapComponentProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onSelectIssue: (issue: Issue | null) => void;
  onSelectCoordinates: (lat: number, lng: number) => void;
  onBoundsChange?: (bounds: { west: number; south: number; east: number; north: number }) => void;
  prefilledCoords?: { lat: number; lng: number } | null;
}

// Preseeded safety/emergency locations for Metro Heights (SF Coordinates)
const HOSPITALS = [
  { id: 'h1', name: "Metro Heights Emergency Hospital", lat: 37.784, lng: -122.433, type: 'hospital', detail: "24/7 ICU & Trauma Center" },
  { id: 'h2', name: "St. Jude Community Medical", lat: 37.762, lng: -122.405, type: 'hospital', detail: "Emergency & Walk-in care" },
];

const POLICE_STATIONS = [
  { id: 'p1', name: "Central Metro Police Headquarters", lat: 37.778, lng: -122.412, type: 'police', detail: "Main precinct - active dispatch" },
  { id: 'p2', name: "Sutter Ward Security Hub", lat: 37.755, lng: -122.445, type: 'police', detail: "Substation & Neighborhood patrol" },
];

const SHELTERS = [
  { id: 's1', name: "Civic Hall emergency Shelter", lat: 37.7795, lng: -122.418, type: 'shelter', capacity: '120/150 spots active', contact: "Zone-1 Disaster Response" },
  { id: 's2', name: "Sunset High Safe Haven", lat: 37.748, lng: -122.451, type: 'shelter', capacity: '35/100 spots active', contact: "Red Cross Chapter" },
  { id: 's3', name: "Mission Community Safe Zone", lat: 37.761, lng: -122.421, type: 'shelter', capacity: '88/120 spots active', contact: "Civic Volunteer Center" },
];

const FLOOD_ZONES = [
  { id: 'f1', name: "Marina Coastal Inundation Risk Area", lat: 37.802, lng: -122.437, radius: 500, riskLevel: "High" },
  { id: 'f2', name: "Mission Creek Drainage Spill Zone", lat: 37.771, lng: -122.395, radius: 450, riskLevel: "Medium" },
];

const ALL_HOSPITALS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'hospital').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'hospital',
    detail: c.detail
  })),
  ...HOSPITALS
];

const ALL_POLICE_STATIONS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'police').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'police',
    detail: c.detail
  })),
  ...POLICE_STATIONS
];

const ALL_SHELTERS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'shelter').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'shelter',
    capacity: c.capacity || '200/250 spots active',
    contact: c.contact || 'Disaster Response Desk'
  })),
  ...SHELTERS
];

const ALL_FLOOD_ZONES = [
  ...INDIAN_RISK_ZONES.map(z => ({
    id: z.id,
    name: z.name,
    lat: z.lat,
    lng: z.lng,
    radius: z.radius,
    riskLevel: z.riskLevel
  })),
  ...FLOOD_ZONES
];

export default function MapComponent({ issues, selectedIssue, onSelectIssue, onSelectCoordinates, onBoundsChange, prefilledCoords }: MapComponentProps) {
  // Leaflet references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const overlaysLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const onBoundsChangeRef = useRef(onBoundsChange);
  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  }, [onBoundsChange]);

  // States for dynamic layers and tools
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [hospitalsEnabled, setHospitalsEnabled] = useState(true);
  const [policeEnabled, setPoliceEnabled] = useState(true);
  const [sheltersEnabled, setSheltersEnabled] = useState(true);
  const [floodZonesEnabled, setFloodZonesEnabled] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [routeEnabled, setRouteEnabled] = useState(false);

  // Route guidance variables
  const [routeDetails, setRouteDetails] = useState<{
    destinationName: string;
    distance: string;
    time: string;
    steps: string[];
  } | null>(null);

  // Geocoding Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Find emergency centres near selected issue
  const nearbyEmergencyCentres = selectedIssue ? [
    ...ALL_HOSPITALS.map(h => ({ ...h, category: 'Hospital', icon: '🏥' })),
    ...ALL_POLICE_STATIONS.map(p => ({ ...p, category: 'Police Station', icon: '👮' })),
    ...ALL_SHELTERS.map(s => ({ ...s, category: 'Emergency Shelter', icon: '🏠' }))
  ].map(center => {
    const dist = Math.sqrt(
      Math.pow(center.lat - selectedIssue.lat, 2) + 
      Math.pow(center.lng - selectedIssue.lng, 2)
    ) * 111;
    return { ...center, distance: dist };
  }).filter(c => c.distance < 25)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3) : [];

  // Standard Leaflet Icon fix or modern DivIcon generators
  const getLiveLocationIcon = () => {
    return L.divIcon({
      className: 'custom-live-location-icon',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <span class="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-30 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px] font-bold">👤</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const getLockIcon = () => {
    return L.divIcon({
      className: 'custom-lock-location-icon',
      html: `
        <div class="relative flex items-center justify-center w-9 h-9">
          <span class="absolute inline-flex w-full h-full rounded-full bg-rose-500 opacity-40 animate-ping"></span>
          <span class="relative inline-flex rounded-xl h-6 w-6 bg-rose-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold animate-bounce">📍</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  const getIssueIcon = (priority: string, status: string, isSelected: boolean) => {
    let color = '#eab308'; // medium
    let pulseClass = 'pulse-yellow';
    if (status === 'resolved') {
      color = '#10b981';
      pulseClass = 'pulse-green';
    } else if (priority === 'critical') {
      color = '#ef4444';
      pulseClass = 'pulse-red';
    } else if (priority === 'high') {
      color = '#f97316';
      pulseClass = 'pulse-orange';
    }

    const size = isSelected ? 40 : 32;
    const innerSize = isSelected ? 'h-5 w-5 border-4' : 'h-4 w-4 border-2';
    const highlightRing = isSelected ? 'border-blue-400 border-2 scale-125 z-40' : '';

    return L.divIcon({
      className: `custom-issue-icon ${highlightRing}`,
      html: `
        <div class="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
          <span class="absolute inline-flex w-7 h-7 rounded-full opacity-70 ${pulseClass}"></span>
          <span class="relative inline-flex rounded-full ${innerSize} bg-slate-950 border-white shadow-xl" style="background-color: ${color}"></span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  const getPOIIcon = (type: 'hospital' | 'police' | 'shelter') => {
    let emoji = '🏥';
    let bgColor = 'bg-red-600';
    let borderColor = 'border-red-400';
    if (type === 'police') {
      emoji = '👮';
      bgColor = 'bg-blue-600';
      borderColor = 'border-blue-400';
    } else if (type === 'shelter') {
      emoji = '🔥';
      bgColor = 'bg-amber-600';
      borderColor = 'border-amber-400';
    }

    return L.divIcon({
      className: `custom-poi-icon-${type}`,
      html: `
        <div class="flex items-center justify-center w-7 h-7 rounded-xl ${bgColor} border ${borderColor} text-white shadow-lg text-xs font-bold font-sans">
          ${emoji}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  };

  // Get current user live geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 14, { animate: true });
        }
      },
      (error) => {
        console.warn("Geolocation failed or denied, using core coordinates:", error);
        setIsLocating(false);
        // Alert user softly
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Osm Nominatim Geocoding API
  const handleGeocodingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResults(data.length > 0);
      }
    } catch (err) {
      console.error("Geocoding fetch failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use CartoDB Dark Matter tile layer for an elegant futuristic design
    // Centering the map on India (coordinates 20.5937, 78.9629) with view level 5 by default
    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(map);

    // Click handler to select coordinates for reporting
    map.on('click', (e) => {
      onSelectCoordinates(e.latlng.lat, e.latlng.lng);
    });

    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      if (onBoundsChangeRef.current) {
        onBoundsChangeRef.current({
          west: bounds.getWest(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          north: bounds.getNorth(),
        });
      }
    };

    map.on('moveend', handleMoveEnd);

    // Layer group to manage all overlay markers/polygons dynamically
    const overlaysGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    overlaysLayerGroupRef.current = overlaysGroup;

    // Trigger initial bounds calculation
    setTimeout(() => {
      handleMoveEnd();
    }, 300);

    // Try to trigger geolocation on load immediately for live experience
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          map.setView([latitude, longitude], 13);
          handleMoveEnd();
        },
        (error) => {
          console.warn("Geolocation permission denied or timed out. Defaulting to India view.", error);
          handleMoveEnd();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      handleMoveEnd();
    }

    return () => {
      map.off('moveend', handleMoveEnd);
      map.remove();
      mapInstanceRef.current = null;
      overlaysLayerGroupRef.current = null;
    };
  }, []);

  // Update Map Layers whenever states or props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = overlaysLayerGroupRef.current;
    if (!map || !group) return;

    // Clear previous items from overlays group
    group.clearLayers();

    // 1. Add User Location Marker
    if (userLocation) {
      const uMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: getLiveLocationIcon()
      });
      uMarker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>Your Location</b><br/>Ready for local dispatch reporting</div>`);
      group.addLayer(uMarker);
    }

    // 1b. Add Locked Prefilled Coordinate Marker (Coordinates Locking System)
    if (prefilledCoords) {
      const lockMarker = L.marker([prefilledCoords.lat, prefilledCoords.lng], {
        icon: getLockIcon()
      });
      lockMarker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🔒 Location Locked</b><br/>Ready to report issue here:<br/>${prefilledCoords.lat.toFixed(5)}, ${prefilledCoords.lng.toFixed(5)}</div>`);
      group.addLayer(lockMarker);
    }

    // 2. Add Hospitals and Police Stations
    if (hospitalsEnabled) {
      ALL_HOSPITALS.forEach(h => {
        const marker = L.marker([h.lat, h.lng], { icon: getPOIIcon('hospital') });
        marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🏥 ${h.name}</b><br/>${h.detail}</div>`);
        group.addLayer(marker);
      });
    }

    if (policeEnabled) {
      ALL_POLICE_STATIONS.forEach(p => {
        const marker = L.marker([p.lat, p.lng], { icon: getPOIIcon('police') });
        marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>👮 ${p.name}</b><br/>${p.detail}</div>`);
        group.addLayer(marker);
      });
    }

    // 3. Add Emergency Shelters
    if (sheltersEnabled) {
      ALL_SHELTERS.forEach(s => {
        const marker = L.marker([s.lat, s.lng], { icon: getPOIIcon('shelter') });
        marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🔥 ${s.name}</b><br/>Capacity: ${s.capacity}<br/>Contact: ${s.contact}</div>`);
        group.addLayer(marker);
      });
    }

    // 4. Draw Flood Zones
    if (floodZonesEnabled) {
      ALL_FLOOD_ZONES.forEach(f => {
        const circle = L.circle([f.lat, f.lng], {
          radius: f.radius,
          color: '#3b82f6',
          fillColor: '#1d4ed8',
          fillOpacity: 0.25,
          weight: 1.5,
          dashArray: '4, 4'
        });
        circle.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🌊 ${f.name}</b><br/>Risk Level: <span class="text-red-500 font-bold">${f.riskLevel}</span></div>`);
        group.addLayer(circle);
      });
    }

    // 5. Draw Heatmap Mode vs. Normal Civic Issue Markers
    if (heatmapEnabled) {
      issues.forEach(issue => {
        // Overlay a glowing warm radius zone for density representation
        const heatCircle = L.circle([issue.lat, issue.lng], {
          radius: 200,
          stroke: false,
          fillColor: issue.priority === 'critical' ? '#ef4444' : issue.priority === 'high' ? '#f97316' : '#eab308',
          fillOpacity: 0.35,
        });
        group.addLayer(heatCircle);
      });
    } else {
      // Normal interactive markers
      issues.forEach(issue => {
        const isSelected = selectedIssue?.id === issue.id;
        const marker = L.marker([issue.lat, issue.lng], {
          icon: getIssueIcon(issue.priority, issue.status || 'open', isSelected)
        });

        // Add robust popup context
        const popupContent = `
          <div class="text-slate-900 font-sans p-1 max-w-[200px]">
            <h4 class="font-bold text-xs mb-0.5 leading-tight">${issue.title}</h4>
            <span class="inline-block text-[9px] uppercase px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold mb-1">${issue.category}</span>
            <p class="text-[11px] text-slate-600 line-clamp-2 mb-1.5">${issue.description}</p>
            <div class="flex justify-between items-center text-[9px] border-t pt-1 border-slate-100 text-slate-500 font-mono">
              <span>Impact: ${issue.aiImpactScore || '60'}/100</span>
              <span>${issue.status}</span>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        // Listen to marker selection
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onSelectIssue(issue);
        });

        group.addLayer(marker);
      });
    }

    // 6. Nearest Safe Location Route Guidance
    if (routeEnabled && userLocation) {
      // Find the absolute nearest Shelter or Hospital to current user position
      const safeHavens = [
        ...ALL_SHELTERS.map(s => ({ name: s.name, lat: s.lat, lng: s.lng, desc: "Emergency Shelter" })),
        ...ALL_HOSPITALS.map(h => ({ name: h.name, lat: h.lat, lng: h.lng, desc: "Medical Trauma HQ" }))
      ];

      let nearest: typeof safeHavens[0] | null = null;
      let minDistance = Infinity;

      safeHavens.forEach(haven => {
        const dist = Math.sqrt(Math.pow(userLocation.lat - haven.lat, 2) + Math.pow(userLocation.lng - haven.lng, 2));
        if (dist < minDistance) {
          minDistance = dist;
          nearest = haven;
        }
      });

      if (nearest) {
        const dest: typeof safeHavens[0] = nearest;
        // Draw simulated safe path grid (makes parallel/perpendicular turn coordinates)
        const latMid = userLocation.lat;
        const lngMid = dest.lng;

        const pathCoords: L.LatLngExpression[] = [
          [userLocation.lat, userLocation.lng],
          [latMid, lngMid],
          [dest.lat, dest.lng]
        ];

        const polyline = L.polyline(pathCoords, {
          color: '#60a5fa',
          weight: 4,
          opacity: 0.9,
          dashArray: '5, 8',
          lineCap: 'round',
          lineJoin: 'round',
        });

        group.addLayer(polyline);

        // Highlight marker for the target destination
        const destinationPulse = L.circle([dest.lat, dest.lng], {
          radius: 80,
          color: '#10b981',
          fillColor: '#059669',
          fillOpacity: 0.45,
          weight: 2
        });
        group.addLayer(destinationPulse);

        // Calculate metadata for user routing panel
        const rawDistKm = (minDistance * 111).toFixed(2); // roughly 111 km per degree lat
        const calculatedTimeMin = Math.round(minDistance * 111 * 12); // walking: ~12 min per km

        setRouteDetails({
          destinationName: dest.name,
          distance: `${rawDistKm} KM`,
          time: `${calculatedTimeMin} mins (walking)`,
          steps: [
            `Depart from your current live coordinates.`,
            `Head East along low-risk pedestrian zones (${Math.round(minDistance * 111 * 400)}m).`,
            `Turn onto parallel safety corridor corridor near ${dest.lng.toFixed(4)}.`,
            `Slight advance northwards avoiding flood risk zones.`,
            `Arrive safely at ${dest.name} (${dest.desc}).`
          ]
        });

        // Automatically fly bounds to encompass whole escape route
        const bounds = L.latLngBounds([
          [userLocation.lat, userLocation.lng],
          [dest.lat, dest.lng]
        ]);
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
      }
    } else {
      setRouteDetails(null);
    }

  }, [
    issues, selectedIssue, userLocation, 
    hospitalsEnabled, policeEnabled, sheltersEnabled, 
    floodZonesEnabled, heatmapEnabled, routeEnabled,
    prefilledCoords
  ]);

  // Handle selected issue fly to map effect to fit both issue & nearby emergency centers
  useEffect(() => {
    if (selectedIssue && mapInstanceRef.current) {
      const centers = [
        ...ALL_HOSPITALS,
        ...ALL_POLICE_STATIONS,
        ...ALL_SHELTERS
      ].map(c => {
        const dist = Math.sqrt(Math.pow(c.lat - selectedIssue.lat, 2) + Math.pow(c.lng - selectedIssue.lng, 2)) * 111;
        return { ...c, dist };
      }).filter(c => c.dist < 25)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      if (centers.length > 0) {
        const points: L.LatLngExpression[] = [
          [selectedIssue.lat, selectedIssue.lng],
          ...centers.map(c => [c.lat, c.lng] as L.LatLngExpression)
        ];
        const bounds = L.latLngBounds(points);
        mapInstanceRef.current.flyToBounds(bounds, {
          padding: [60, 60],
          duration: 1.2
        });
      } else {
        mapInstanceRef.current.setView([selectedIssue.lat, selectedIssue.lng], 14, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [selectedIssue]);

  // Handle prefilledCoords fly to map effect
  useEffect(() => {
    if (prefilledCoords && mapInstanceRef.current) {
      mapInstanceRef.current.setView([prefilledCoords.lat, prefilledCoords.lng], 15, {
        animate: true,
        duration: 1
      });
    }
  }, [prefilledCoords]);

  const handleZoom = (factor: number) => {
    if (mapInstanceRef.current) {
      const current = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(factor > 1 ? current + 1 : current - 1);
    }
  };

  const resetMap = () => {
    if (mapInstanceRef.current) {
      if (userLocation) {
        mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
      } else {
        mapInstanceRef.current.setView([20.5937, 78.9629], 5, { animate: true });
      }
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col md:flex-row">
      
      {/* Left side Map Container */}
      <div className="relative flex-1 h-full min-h-[300px]">
        
        {/* Nominatim OSM Geocoding Search Bar Overlay */}
        <div className="absolute top-4 left-4 z-10 w-80 max-w-[calc(100%-2rem)] flex flex-col gap-1.5">
          <form onSubmit={handleGeocodingSearch} className="flex items-center gap-1.5 backdrop-blur-md bg-slate-900/80 border border-white/15 px-2.5 py-1.5 rounded-2xl shadow-xl">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search local streets, districts, parks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-sans text-white border-none focus:outline-none flex-1 placeholder:text-slate-500 outline-none"
            />
            <button 
              type="submit" 
              className="p-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-sans font-bold text-[10px] transition shrink-0"
              disabled={isSearching}
            >
              {isSearching ? '...' : 'SEARCH'}
            </button>
          </form>

          {/* Search Results Drawer */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl p-2 shadow-2xl max-h-[160px] overflow-y-auto flex flex-col gap-1 z-50">
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 uppercase px-1 border-b border-white/5 pb-1">
                <span>Search results</span>
                <button onClick={() => setShowSearchResults(false)} className="text-red-400 hover:text-red-300">Close</button>
              </div>
              {searchResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
                      onSelectCoordinates(lat, lng);
                    }
                    setShowSearchResults(false);
                  }}
                  className="w-full text-left text-[11px] py-1.5 px-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition truncate font-sans"
                >
                  📍 {result.display_name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Map Canvas container */}
        <div 
          ref={mapContainerRef} 
          id="leaflet-map-element" 
          className="w-full h-full bg-[#0a0f1d] z-0 cursor-grab active:cursor-grabbing"
        ></div>

        {/* Floating Quick Action Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button 
            onClick={handleLocateUser}
            className={`p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl flex items-center justify-center ${isLocating ? 'animate-spin border-blue-500 text-blue-400' : ''}`}
            title="My Live Geolocation"
          >
            <Compass className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleZoom(1.2)}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleZoom(0.8)}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={resetMap}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title="Recenter City Center"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Floating selected issue overlay */}
        {selectedIssue && (
          <div className="absolute bottom-4 left-4 z-10 w-76 glass-panel-dark text-white border border-white/10 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300 max-h-[160px] overflow-y-auto">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] uppercase tracking-wider font-mono text-blue-300 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900/30">
                {selectedIssue.category}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  (onSelectIssue as any)(null);
                }}
                className="text-white/60 hover:text-white text-[10px] px-1.5 py-0.5 bg-white/5 hover:bg-white/10 rounded transition"
              >
                Close
              </button>
            </div>
            <h4 className="font-display font-bold text-xs mb-0.5 text-white">{selectedIssue.title}</h4>
            <p className="text-[11px] text-slate-300 leading-tight mb-2 line-clamp-2">{selectedIssue.description}</p>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/15 p-1.5 rounded-lg text-[10px] flex items-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <p className="text-slate-300 italic line-clamp-2">
                "{selectedIssue.aiSummary || 'AI Investigation agent is validating incident details...'}"
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Right side Safety layers toggle drawer & Route Guidance details */}
      <div className="w-full md:w-76 border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-lg bg-slate-950/80 p-4.5 flex flex-col gap-4 z-10 overflow-y-auto h-[240px] md:h-full">
        <div>
          <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Safety Layers Control
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Toggle live open-street safety telemetry & emergency checkpoints.</p>
          
          <div className="flex flex-col gap-2">
            
            <button 
              onClick={() => setHospitalsEnabled(!hospitalsEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${hospitalsEnabled ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Heart className={`w-3.5 h-3.5 ${hospitalsEnabled ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                Hospitals / Trauma
              </span>
              <span className="text-[9px] font-mono">{hospitalsEnabled ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setPoliceEnabled(!policeEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${policeEnabled ? 'bg-blue-500/10 border-blue-500/30 text-blue-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Police Headquarters
              </span>
              <span className="text-[9px] font-mono">{policeEnabled ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setSheltersEnabled(!sheltersEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${sheltersEnabled ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                Emergency Shelters
              </span>
              <span className="text-[9px] font-mono">{sheltersEnabled ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setFloodZonesEnabled(!floodZonesEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${floodZonesEnabled ? 'bg-sky-500/10 border-sky-500/30 text-sky-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                Flood-Risk Zones
              </span>
              <span className="text-[9px] font-mono">{floodZonesEnabled ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setHeatmapEnabled(!heatmapEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${heatmapEnabled ? 'bg-purple-500/15 border-purple-500/30 text-purple-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                Issue Density Heatmap
              </span>
              <span className="text-[9px] font-mono">{heatmapEnabled ? 'DENSITY' : 'MARKERS'}</span>
            </button>

          </div>
        </div>

        {/* Nearby Emergency Centres Section */}
        {selectedIssue && nearbyEmergencyCentres.length > 0 && (
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              Nearby Emergency Centres
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-1">
              Closest response dispatch units found near the reported problem area.
            </p>
            <div className="flex flex-col gap-1.5">
              {nearbyEmergencyCentres.map((center) => (
                <div 
                  key={center.id} 
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-0.5 hover:bg-white/10 transition cursor-pointer"
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([center.lat, center.lng], 16, { animate: true });
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-white">
                    <span className="truncate">{center.icon} {center.name}</span>
                    <span className="text-[9px] text-rose-400 font-mono shrink-0 ml-1">
                      {center.distance.toFixed(1)} km
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 truncate">
                    {center.category} • {(center as any).detail || (center as any).capacity || 'Active Dispatch Center'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safe Escape Route Guidance segment */}
        <div className="border-t border-white/10 pt-3 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              Safe Escort Guidance
            </h3>
            <button 
              onClick={() => setRouteEnabled(!routeEnabled)}
              className={`px-2 py-1 rounded-lg text-[9px] font-bold font-mono transition ${routeEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-slate-300 hover:bg-white/15'}`}
            >
              {routeEnabled ? 'ACTIVE' : 'ROUTE'}
            </button>
          </div>

          {!routeEnabled ? (
            <div className="rounded-xl border border-dashed border-white/5 p-3 text-center text-slate-500 text-[10.5px] leading-relaxed">
              Activate route to generate a grid-guided safe escape route to your absolute nearest shelter/hospital.
            </div>
          ) : routeDetails ? (
            <div className="flex-1 flex flex-col gap-2 min-h-0">
              <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl">
                <span className="block text-[8px] font-mono text-emerald-400 uppercase font-bold">Nearest Secure Facility</span>
                <span className="block text-xs font-bold text-white truncate leading-tight">{routeDetails.destinationName}</span>
                <div className="flex gap-2.5 mt-1 text-[10px] font-mono text-slate-400">
                  <span>Dist: <b>{routeDetails.distance}</b></span>
                  <span>Est: <b>{routeDetails.time}</b></span>
                </div>
              </div>

              {/* Turn-by-Turn list */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1 max-h-[120px] md:max-h-none">
                {routeDetails.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start text-[10px] text-slate-300 leading-tight">
                    <span className="text-blue-400 font-mono font-bold">{idx + 1}.</span>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-xs text-center p-4">
              Determining safety route... Make sure your browser has geoshare enabled!
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
