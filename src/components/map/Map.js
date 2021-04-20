import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import hotelIcon from '../../assets/home-icon.svg';
import hotelIconActive from '../../assets/home-icon-active.svg';
import './Style.css';
import {GoogleMap, useLoadScript, Marker,} from "@react-google-maps/api";
import Slider from "../slider/Slider.js";
import BookingForm from "../booking/form/Form";
import MapService from "../../services/MapService.js"


const libraries = ["places","geometry"];

const mapContainerStyle = {
  width: "100%",
  height: "calc(100% - 65px)",
  position: "absolute",
}

const mapOptions = {
  disableDefaultUI: true,
}

function Map() {
  const [mapRef, setMapRef] = useState(useRef(null));
  const [currentLocation, setCurrentLocation] = useState({});
  const [cityLatlng, setCityLatLng] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geoCoderApi, setGeoCoderApi] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (window.google?.maps) setMaps(window.google.maps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.google?.maps]);

  useEffect(() => {
    if (maps && !geoCoderApi) setGeoCoderApi(new maps.Geocoder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maps]);

  useEffect(() => {
    MapService.getLocation(navigator, setCurrentLocation, setCityLatLng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if(currentLocation?.lat && !cityLatlng) {
      MapService.getCityCenterLatLng(currentLocation, maps, geoCoderApi, setCityLatLng)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, cityLatlng, geoCoderApi]);

  useLayoutEffect(() => {
    if(currentLocation && mapRef && cityLatlng) {
      MapService.getNearByHotels(maps, mapRef.current, cityLatlng, currentLocation, setMarkers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, mapRef, cityLatlng]);

  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setCurrentLocation(newPos);
  }

  return (
    <div className="map__text">
      {loadError ? (
        "Error loading maps"
      ) : isLoaded ? (
        <GoogleMap
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={currentLocation}
          onDragEnd={() => handleCenterChanged()}
          onLoad={(map) => {
            setMapRef({...mapRef, current: map});
          }}
          options={mapOptions}
        >
          {markers &&
            markers.map((marker) => (
              <Marker
                key={marker.place_id}
                position={marker.geometry.location}
                draggable={false}
                icon={marker?.active ? hotelIconActive : hotelIcon}
              />
            ))}
          {/* <Marker position={currentLocation} draggable={false} /> */}
        </GoogleMap>
      ) : (
        "Loading Maps"
      )}
      <Slider
        hotelList={markers}
        setMarkers={setMarkers}
        setShowBookingForm={setShowBookingForm}
        setHotelInfo={setHotelInfo}
      />
      <BookingForm
        show={showBookingForm}
        setShowBookingForm={setShowBookingForm}
        hotelInfo={hotelInfo}
        setShowBookingConfirmation={setShowBookingConfirmation}
      />
      {showBookingConfirmation && (
        <div className="modal__container">
          <div className="modal__confirmation">
            <span>Booked Successfully!</span>
            <button
              className="btn booking__button"
              onClick={() => setShowBookingConfirmation(false)}
            >
              Continue to navigate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Map;
