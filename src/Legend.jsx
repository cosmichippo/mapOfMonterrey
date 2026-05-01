import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";
import { useMap } from "react-leaflet";

function Legend({json}) { 
    const map = useMap();
    // console.log(map)
    useEffect(() => {
        if (!map) return;
    // ok now i want to get the information that i have from the json file
    
    //const iterator = json.features.values();
    const colormap = {
                 "0": "#ffffe5", 
                 "-1": "#fee390", 
                 "-2": "#fe9829", 
                 "-3": "#cb4b02", 
                 "-4": "#662506",
    }
    const namemap = {
        '0': ' km',
        '-1': ' 10 km',
        '-2': ' 100 km',
        '-3': ' 1,000 km',
        '-4': ' 10,000 km'
    }
    const legend = L.control({ position: "topright" });
    legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        for (const val in colormap) {
            const per = namemap[val];
            const color = colormap[val];
            console.log(color);
            div.innerHTML += '<i style="background: '+ color + '"></i>' +'&ndash; one sensor every'+per+ '<br> '; 
        } 
        div.innerHTML += '<i style="background: '+"#979797"+'"></i> &ndash; no sensors <br> '; 
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
