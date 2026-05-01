import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";
import { useMap } from "react-leaflet";

function Legend({json}) { 
    const key = "keyName"
    const map = useMap();
    // console.log(map)
    useEffect(() => {
        if (!map) return;
    // ok now i want to get the information that i have from the json file
    
    //const iterator = json.features.values();
    
    const unique = new Set();
    for (let i = 0; i < json.features.length; i++){

        const key = 'floor_color';
        const value = json.features[i].properties[key];
        unique.add(value)
        // hacky fix: check for value 
    }
    // man this is fucking hacky and gross
    const sorted = [...unique].sort();
    const legend = L.control({ position: "topright" });
    legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        for (const val of sorted) { 
            console.log(`<i style="background-color:`+ val + `"></i><br>`)
            div.innerHTML += '<i style="background: '+val + '"></i>' +'&ndash;<br>'; 
        }
        
        return div;
    };

    legend.addTo(map);

    // Cleanup function to remove the legend when the component unmounts
    return () => {
        legend.remove();
    };
    }, [map]);
}

export default Legend;
