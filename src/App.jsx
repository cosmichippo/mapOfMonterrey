
import React from "react";
import SimpleMap from "./SimpleMap";

import foo from '../densities_25.json' with {type: 'json'};

function App() {
  return (
    <div>
      <div className="Explanation">
        <h4>The work I did</h4>
        This map highlights the disparate gaps in <a>PurpleAir</a> sensor access between 
        communities within Santa Cruz, Monterey, and San Benito counties. Air quality can vary significantly within distances under 1km.
        This concern is particularly important because of the amount of farmwork that is done in the salinas valley which is overwhelmingly
        unaccounted for.
  
      </div>
      <SimpleMap mapData={foo}/>
    </div>
  );
}

export default App;