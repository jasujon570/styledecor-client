import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ServiceCoverageMapSection = () => {
  const position = [23.8103, 90.4125];

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Our Service Coverage Area
      </h2>
      <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-base-300">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          className="h-125 w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <strong>StyleDecor HQ</strong> <br /> We operate mainly around
              this area and surrounding districts.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ServiceCoverageMapSection;
