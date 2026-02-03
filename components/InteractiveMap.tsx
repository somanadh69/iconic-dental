"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet's default icon path issues in Next.js/Webpack
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function InteractiveMap() {
    // Arlington, VA coordinates
    const position: [number, number] = [38.8816, -77.1118];

    useEffect(() => {
        // Cleanup function if needed, but MapContainer handles mostly
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            style={{ width: "100%", height: "100%", background: "#0f172a" }} // dark background fallback
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    <div className="text-slate-900 font-sans">
                        <strong>Iconic Dental HQ</strong><br />
                        Arlington, VA
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
