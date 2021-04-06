import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Switch from "react-switch";

import '../styles/css/maps.css'
import 'leaflet/dist/leaflet.css';

function Maps () {
    const [locationSwitchCheck, setLocationSwitchCheck] = useState(false);

    const history = useHistory();
    
    return (
        <div className="mapDiv">
            <MapContainer
            className="markercluster-map"
            center={[59.334591, 18.063240]}
            zoom={13}
            maxZoom={18}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
            <div className="addressLocationBox">
                <form onSubmit={() => history.push('/menu')}>
                    <input type="text" placeholder="Add address" className={`${"adressInputForm"} ${"locationBoxElement"}`} ></input>
                    <input type="submit" value="Send" className="submitLocationButton"/>
                </form>
                <div className={`${"activateLocationTrackingDiv"} ${"locationBoxElement"}`}>
                    <h5>Activate location</h5>
                    <Switch uncheckedIcon={false} checkedIcon={false} checked={locationSwitchCheck} onChange={() => setLocationSwitchCheck(!locationSwitchCheck)}/>
                </div>
            </div>
        </div>
    );
}

export default Maps;