import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';
import markerImg from './marker.png';

const Map = (props) => {
  const { center, zoom } = props;
  console.log(center);
  const mapRef = useRef();

  // use effect helps ensure jsx returned renders before functions related to rendering map executes
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom,
    });
    // new mapboxgl.Marker({ position: center, map: map });}

    var geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [center.lng, center.lat],
          },
        },
      ],
    };

    // add markers to map
    geojson.features.forEach(function (marker) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url("' + markerImg + '")';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
