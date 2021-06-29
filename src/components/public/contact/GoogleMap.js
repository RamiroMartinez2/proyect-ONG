import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
const GoogleMapComponent = () => {
  const [address, setAdress] = useState("");

  const key = "AIzaSyAbtLpuihssQ11VNOGGul4bzO6j8tMx2hE",
    mapId = "b23b721c336d70e0",
    position = { lat: -34.6063708, lng: -58.3903995 };

  useEffect(() => {
    (function () {
      const url = "http://ongapi.alkemy.org/api/organization";
      axios
        .get(url)
        .then((res) => {
          setAdress(res.data.data[0].address);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={key}
        libraries={["places"]}
        mapIds={[mapId]}
      >
        <GoogleMap
          center={position}
          zoom={15}
          options={{ mapId: mapId, origin: address }}
          mapContainerStyle={{ height: "400px", width: "90vw" }}
        >
          <Marker position={position} label="Somos Más" />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
