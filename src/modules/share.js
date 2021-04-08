import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import itemData from './itemData';

import shareSoup from '../assets/shareSoupViewAssets/shareSoup.png';
import shareIcon from '../assets/shareSoupViewAssets/shareIcon.png';
import socialMedia from '../assets/shareSoupViewAssets/socialMedia.png';

import '../styles/css/share.css';

function ShareView(props){

    function RenderPurchasedSoups () {

        function RenderSoupitem ({item}) {
            return(
                <div className="soupItem">
                    {itemData[item.id].image}
                    <div className="soupItemAmountAndName">
                        <h4>x{item.amount}</h4>
                        <h3>{itemData[item.id].name}</h3>
                    </div>
                    <img src={shareIcon} alt="Share icon" className="shareIcon"/>
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

    return(
        <div className="shareViewDiv">
            <TopBackgroundCurveShape/>
            <MenuTopBarWithNavIcons leftItem={"goBack"} rightItem={"menu"} rightItemOnClick={props.manageSlideOut}/>
            <h1>Enjoy your soup!</h1>
            <img src={shareSoup} alt="Share pictures of your soup online!" className="shareSoupImage"/>
            <h3 className="shareYourSoupText">Share your soup on your social media and get 10% off next order!</h3>
            <RenderPurchasedSoups/>
            <img src={socialMedia} alt="Share soups online here" className="socialMediaIcons"/>
        </div>
    )
}

export default ShareView;