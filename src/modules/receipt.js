import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import { useHistory } from 'react-router-dom';

import '../styles/css/receipt.css';

import check from '../assets/receiptAssets/check.png';
import cookingChef from '../assets/receiptAssets/cookingChef.png';

import itemData from './itemData';
import cardData from './cardData';

function ReceiptView(props){

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function FoodItem ({item}) {
        return(
            <div className="renderedReceiptItem">
                <img src={check} alt="foodItem" className="receiptItemPicture"/>
                <h4>x{item.amount}</h4>
                <h3>{itemData[item.id].name}</h3>
                <h3 className="priceDiv">{itemData[item.id].price};-</h3>
            </div>
        )
    }

    function FlowerAndCardItem({flowerAndCardProps}){
        return(
            <div className="renderedReceiptItem">
                {cardData[flowerAndCardProps.id].image}
                <div className="bouquetAndCardDisplay">
                    <div className="bouquetDisplayText">
                        <h4>x1</h4>
                        <h3>{capitalizeFirstLetter(flowerAndCardProps.size)} bouquet</h3>
                    </div>
                    <div className="cardDisplayText">
                        <h4>x1</h4>
                        <h3>Custom card</h3>
                    </div>
                </div>
                <h3 className="priceDiv">{cardData[flowerAndCardProps.id].price};-</h3>
            </div>
        )
    }

    return(
        <div className="receiptViewDiv">
            <MenuTopBarWithNavIcons leftItem={"goBack"}/>
            <div className="receiptTop">
                <img src={check} alt="" className="receiptCheck"/>
                <h1>Thank you!</h1>
                <p>Your soup is now cooking</p>
                <div className="orbContainerDiv">
                    <div className="orbLeft"/>
                    <div className="orbRight"/>
                </div>
            </div>
            <div className="receiptBody">
                <h4>Deliver to: address</h4>
                <div className="receiptItems">
                    {props.state.cartItems.map(item => {
                        return item.amount > 0 ? <FoodItem item={item}/> : null;
                    })}
                    {props.state.flowersAndCard.id !== undefined ? <FlowerAndCardItem flowerAndCardProps={props.state.flowersAndCard}/> : null}
                </div>
                <div className="totalDiv">
                    <div/>
                    <h3>Total</h3>
                    <h3>{props.state.totalAmount};-</h3>
                </div>
                <img src={cookingChef} alt="" className="cookingChefImg"/> 
            </div>
            <button className="trackOrderButton">Track your order</button>
        </div>
    )
}

export default ReceiptView;