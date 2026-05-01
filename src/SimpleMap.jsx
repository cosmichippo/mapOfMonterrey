import React, { useState, useEffect } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import HoverLegend from "./HoverLegend";




function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

const SimpleMap = ({mapData}) => {
  // const mapRef = useRef(null);
  // const latitude = 36.508017; 
  // const longitude = -121.442490;
  const MAP_DEFAULTS = {center: [36.508017, -121.442490], zoom: 9}
  const [myLayer, setMyLayer] = useState(null);
  const updateMyLayer = (info) => {
    setMyLayer(info);
    console.log(info);
  };
  
  const highlightFeature = (feature, layer)=> {
      layer.on({
        mouseover: (e) => {
          e.target.setStyle({
            fillOpacity: 0.7,
            weight: 2,
          });
        },
        mouseout: (e) => {
          e.target.setStyle({
            fillOpacity: 0.5,
            weight: 1,
          });
        },
        click: (e) => {
          // Handle click events, e.g., zoom to feature
          updateMyLayer(feature);
        }
      })
  }

  // simple linear interpolation function (UNUSED)
  //const lerp = (my_val, max_val, min_val, color_start, color_end) => {
    //// get size based on max / min
    //const float = (my_val - min_val) / (max_val - min_val);
    //return (start * (1 - float) + end * float)
  //};
  
  // log : 1 - 10, 2 100, 3, 1000
  const stylefunction = (feature)=> {
    const map = {
                 "0": "#ffffe5", 
                 "-1": "#fee390", 
                 "-2": "#fe9829", 
                 "-3": "#cb4b02", 
                 "-4": "#662506",
    }

    let legendcolor = "#000000ff";
    if ("density_log10_floor" in feature.properties){
      const key = feature.properties.density_log10_floor
      
      if (key in map) {
        legendcolor = map[key]; 
      } else {
        // we don't have a color value for it
        legendcolor = "#979797";
      }
      return {color: legendcolor, fillOpacity: 0.5};

    }
    return {color: legendcolor, fillOpacity: 0.5};
  }
 

  return ( 
      <MapContainer center={MAP_DEFAULTS.center}
                    zoom={MAP_DEFAULTS.zoom} 
                    scrollWheelZoom={true} 
                    style={{height: "80vh", width: "100vw"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData && <GeoJSON data={mapData} style={stylefunction} onEachFeature={highlightFeature}/>}
        <Legend json={mapData}/>
        <p>TEST</p>
        <HoverLegend state={myLayer} position={"bottomright"}/>
        
      </MapContainer>
  );
};

export default SimpleMap;