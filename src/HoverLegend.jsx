import { useEffect, useState} from "react";
import L from "leaflet";
import "./Legend.css";
import { useMap } from "react-leaflet";

function HoverLegend({state, position}) { 
    const map = useMap();
    // console.log(map)
    useEffect(() => {
        if (!map) return;
    const info = L.control({ position: position });
    info.onAdd = function () {
        this._div = L.DomUtil.create("div", "info legend");
        this.update()
        return this._div;
    };
    info.update = function (props) {
        const nunique = (state == null) ? 'Select Geometry': `${state.properties.nunique} per ${Math.trunc(state.properties.Shape_Area)}kmsqrt`;
        const density = (state == null) ? 'Select Geometry': state.properties.approx_density;

        this._div.innerHTML = `<h4>Sensors</h4> <p>${nunique}</p> <br><h4>Density</h4> ${density}`;
    }

    info.addTo(map);

    // Cleanup function to remove the legend when the component unmounts
    return () => {
        info.remove();
    };
    }, [map, state]);
}

export default HoverLegend;
