import React, { useState, useEffect } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMapEvents } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import { marker } from "./MapIcons";

function MapCurrentLocation() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      load: (e) => {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    useEffect(() => {
      map.locate();
    }, []);

    return position === null ? null : (
      <Marker position={position} icon={marker}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div className="main-panel">
      <MapContainer
        center={{ lat: 21.1458, lng: 79.0882 }}
        zoom={14}
        scrollWheelZoom
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default MapCurrentLocation;
