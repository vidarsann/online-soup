import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import '../styles/css/loginScreen.css'
import "react-alice-carousel/lib/alice-carousel.css";

import soupOnline from '../assets/soupOnline.png';
import craving from '../assets/craving.png';
import sick from '../assets/sick.png';
import soupOnTruck from '../assets/soupOnTruck.png';
import facebook from '../assets/facebook.png';

function Carousel () {
    const handleDragStart = (e) => e.preventDefault();

    const items = [
        [<img src={craving} alt="Craving a soup?" onDragStart={handleDragStart} />, <h2 className="slideShowText">Craving a soup?</h2>],
        [<img src={sick} alt="Having a friend in need of a boost?" onDragStart={handleDragStart} />, <h2 className="slideShowText">Having a friend in need of a boost?</h2>],
        [<img src={soupOnTruck} alt="We deliver the soup!" onDragStart={handleDragStart} />, <h2 className="slideShowText">We deliver the soup!</h2>],
    ];

    const SlideShow = <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls={true}
    />

    return SlideShow;
}

function LoginScreen () {
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();

    const handleChange = (number) => setPhoneNumber(number);

    const handleSubmit = () => history.push('/map');

    return(
        <div className="loginScreen">
            <img src={soupOnline} alt="Soup online logo"className="titlePicture"/>
            <Carousel/>
            <div className="inversedTopOvalCurvedRectangle">
                <div className="loginContainer">
                    <div className="loginForm">
                        <form onSubmit={handleSubmit}>
                            <input type="text" value="+46" disabled id="disabledCellNumberInput"/>
                            <input type="number" id="interactiveCellNumberInput" placeholder="Phone number" onChange={(e) => handleChange(e.target.value)} value={phoneNumber}></input>
                            <input type="submit" className="loginSubmitButton"/>
                        </form>
                    </div>
                    <p>or</p>
                    <button type="button" className="facebookButton" onClick={handleSubmit}>
                        <img src={facebook} alt="Facebook login"></img>
                        <p>Continue with facebook</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;