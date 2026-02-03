"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

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

// Component to update map view if props change
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom);
    }, [center, zoom, map]);
    return null;
}

interface InteractiveMapProps {
    lat?: number;
    lng?: number;
    zoom?: number;
    address?: string;
    googleMapsUrl?: string;
}

export default function InteractiveMap({
    lat = 38.8824,
    lng = -77.1109,
    zoom = 15,
    address = "4040 North Fairfax Drive, Suite 300\nArlington, VA",
    googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=4040+North+Fairfax+Drive+Arlington+Virginia+22203"
}: InteractiveMapProps) {
    const position: [number, number] = [lat, lng];

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            style={{ width: "100%", height: "100%", background: "#0f172a" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup className="custom-popup">
                    <div className="text-slate-900 font-sans p-2">
                        <strong className="text-lg block mb-1">Iconic Dental HQ</strong>
                        <div className="text-sm text-slate-600 mb-2 whitespace-pre-line">{address}</div>
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                        >
                            Get Directions
                        </a>
                    </div>
                </Popup>
            </Marker>
            <MapUpdater center={position} zoom={zoom} />
        </MapContainer>
    );
}
