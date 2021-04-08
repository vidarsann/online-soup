import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import itemData from './itemData';
import { MapContainer, TileLayer, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/css/tracking.css';

function TrackingView (props) {

    const history = useHistory();

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(20);
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    function goToShareView(){
        history.push('/sharing');
    }

    useEffect(() => {

        if(minutes<15 && minutes > 5){
            setActiveDotIndex(1);
        }
        else if(minutes<5 && minutes !== 0){
            setActiveDotIndex(2);
        }
        else if(minutes===0 && seconds===0){
            setActiveDotIndex(3);
        }

        const setTime = setTimeout(() => {
            if(seconds === 0 && minutes !== 0){
                setSeconds(59);
                setMinutes(minutes - 1);
            }
            else if(seconds <= 59 && seconds > 0){
                setSeconds(seconds - 1)
            }
        }, 1000)
    });


    function CountDownTimer () {
        return(
            <div className="countDownTimer">
                <h3>{minutes < 10 ? "0" + minutes + ":" : minutes + ":"}</h3>
                <h3>{seconds < 10 ? "0" + seconds : seconds}</h3>
                <h3>&nbsp;minutes</h3>
            </div>
        )
    }


    function RenderPurchasedSoups () {

        function RenderSoupitem ({item}) {
            return(
                <div className="soupItem">
                    {itemData[item.id].image}
                    <div className="soupItemAmountAndName">
                        <h4>x{item.amount}</h4>
                        <h3>{itemData[item.id].name}</h3>
                    </div>
                </div>
            )
        }


        return(
            <div className="renderedSoupItems">
                {props.state.cartItems.map(item => {
                    return item.amount !== 0 ? <RenderSoupitem item={item}/> : null;
                })}
            </div>
        )
    }


    function ProgressBar() {

        function ProgressDotWithExtension({final, index}){

            const [activeProgressDot, setActiveProgressDot] = useState("activeDot");

            return(
                <div className="progressDotWithExtension">
                    <div className={index === activeDotIndex ? activeProgressDot + " progressDot" : "progressDot"}/>
                    {final === true ? null : <div className="progressDotExtension"/>}
                </div>
            )
        }

        function ProgressBarText () {
            return(
                <div className="progressBartext">
                    <h5>Cooking your soup</h5>
                    <h5>Soup is on the way!</h5>
                    <h5>Rider is nearby</h5>
                    <h5>Order delivered</h5>
                </div>
            )
        }

        return (
            <div className="progressBar">
                <div className="progressBarDots">
                    <ProgressDotWithExtension index={0}/>
                    <ProgressDotWithExtension index={1}/>
                    <ProgressDotWithExtension index={2}/>
                    <ProgressDotWithExtension index={3} final={true}/>
                </div>
                <ProgressBarText/>
            </div>
        )
    }

    return(
        <div className="trackingViewDiv">
            <TopBackgroundCurveShape/>
            <MenuTopBarWithNavIcons leftItem="goBack" rightItem={"menu"} rightItemOnClick={props.manageSlideOut}/>
            <h1>Coming your way!</h1>
            <CountDownTimer/>
            <RenderPurchasedSoups/>
            <ProgressBar/>
            <div id="mapDiv">
                <MapContainer
                    className="markercluster-map"
                    center={props.state.mapLatLng}
                    zoom={13}
                    maxZoom={18}
                    >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Popup position={props.state.mapLatLng}>
                        Your location
                    </Popup>
                </MapContainer>
            </div>
            <button className="shareRouteButton" onClick={goToShareView}>Share route</button>
        </div>
    )
}

export default TrackingView;