import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, useMapEvents } from 'react-leaflet'
import Switch from "react-switch";

import '../styles/css/maps.css'
import 'leaflet/dist/leaflet.css';

function Maps (props) {
    const [locationSwitchCheck, setLocationSwitchCheck] = useState(false);
    const [position, setPosition] = useState(props.state.mapLatLng);

    const history = useHistory();

    function MapClick () {

        const map = useMapEvents({
            click(e) {
                setPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ])
                props.editLocation([
                    e.latlng.lat,
                    e.latlng.lng
                ])
                if(locationSwitchCheck){
                    map.locate();
                }
            },
            locationfound(e){
                setPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
                props.editLocation([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })
        return (
            position ? 
                <Popup        
                key={position[0]}
                position={position}
                interactive={false} 
                > Your location </Popup>
            : null
        )   
    }

    return (
        <div className="mapDiv">
            <MapContainer
            className="markercluster-map"
            center={position}
            zoom={13}
            maxZoom={18}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClick/>
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