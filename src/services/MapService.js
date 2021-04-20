/* eslint-disable import/no-anonymous-default-export */
export default {

  getCityCenterLatLng: (latlng, maps, geoCoderApi, setCityLatLng) => {
    if (geoCoderApi) {
      geoCoderApi.geocode({location: latlng,},
        (results, status) => {
          if (status === maps.GeocoderStatus.OK && results?.length > 0) {
            const placeId = results[results.length - 1]?.place_id;
            geoCoderApi.geocode({placeId: placeId,},
              (results, status) => {
                if (status === maps.GeocoderStatus.OK) {
                  const latLng = results[0].geometry.location;
                  setCityLatLng(latLng);
                } else console.log("Something got wrong " + status);
              }
            );
          } else console.log("Something got wrong " + status);
        }
      );
    }
  },

  getNearByHotels: (maps, map, cityLatlng, currentLocation, setMarkers) => {
    if (maps && cityLatlng) {
      const service = new maps.places.PlacesService(map);
      const placesRequest = () => {
        return {
          location: currentLocation,
          rankBy: maps.places.RankBy.DISTANCE,
          types: ["lodging"],
        };
      };

      service.nearbySearch(
        placesRequest(currentLocation),
        (response, status) => {
          if (status === maps.places.PlacesServiceStatus.OK && response) {
            const newMarkers = response.map((item, index) => {
              const distance = getDistanceFromCityCenter(
                cityLatlng,
                item.geometry.location
              );
              return {
                place_id: item.place_id,
                name: item.name,
                photo: item?.photos ? item?.photos[0]?.getUrl() : null,
                location: item.location,
                geometry: item.geometry,
                distanceFromCityCenter: distance,
                rate: 90 + index,
                active: index === 0 ? true : false,
              };
            });
            setMarkers(newMarkers);
          }
        }
      );
    }

    const getDistanceFromCityCenter = (cityLatLng, hotelLatLng) => {
      const distanceInKm = (
        maps.geometry.spherical.computeDistanceBetween(
          cityLatLng,
          hotelLatLng
        ) / 1000
      ).toFixed(2);
      return distanceInKm;
    };
  },

  getLocation: (navigator, setCurrentLocation, setCityLatLng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    function getCoordinates(position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    function handleLocationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          setCurrentLocation({
            lat: 52.52,
            lng: 13.405,
          });
          setCityLatLng({
            lat: () => 52.52,
            lng: () => 13.405,
          });
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
        default:
          alert("An unknown error occurred.");
          break;
      }
    }
  },
};