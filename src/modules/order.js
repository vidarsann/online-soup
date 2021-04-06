import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import itemData from './itemData';
import cardData from './cardData';

import menuSlider1 from '../assets/menuSliders/menuSlider1.png';
import popupFlowers from '../assets/cardAndFlowersAssets/popupFlowers.png';
import popupCard from '../assets/cardAndFlowersAssets/popupCard.png';

import '../styles/css/order.css';
import { useState } from 'react';

function OrderView (props) {

    const [showOverlay, setShowOverlay] = useState("show");
    const history = useHistory();

    function goToCardsAndFlowersView () {
        history.push('/card+and+flowers');
    }

    function goToPaymentView () {
        history.push('/payment');
    }

    function closeOverlay(){
        setShowOverlay("hide");
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function OrderItem(itemProps){

        console.log(itemProps);

        const options = [
            { value: '1', label: 'x1' },
            { value: '2', label: 'x2' },
            { value: '3', label: 'x3' },
            { value: '4', label: 'x4' },
            { value: '5', label: 'x5' },
        ]

        return (
            <div className="orderItem">
                <div className="pictureAndQuantity">
                    <img src={menuSlider1} className="orderItemPicture" alt="Soup item"/>
                    <Select options={options} defaultValue={options[itemProps.amount -1]} className={"dropDownController"}/>
                </div>
                <div className="nameAndIngredients">
                    <h2>{itemData[itemProps.id].name}</h2>
                    <div className="ingredientsAndNutrients">
                        <div className="nutrients">
                            <p>Calories: {itemData[itemProps.id].nutrition.calories}</p>
                            <p>Carbs: {itemData[itemProps.id].nutrition.carbs}</p>
                            <p>Protein: {itemData[itemProps.id].nutrition.protein}</p>
                            <p>Fat: {itemData[itemProps.id].nutrition.fat}</p>
                        </div>
                        <div className="ingredients">
                            <p>Ingredients</p>
                            <br/>
                            {itemData[itemProps.id].ingredients.map(function (ingredient){
                                return <p>{ingredient}</p>
                            })}
                        </div>
                    </div>
                </div>
                <div className="priceDiv">
                    <h2>{itemData[itemProps.id].price};-</h2>
                </div>
            </div>
        )
    }

    function DisplayFlowersAndCard({flowersAndCardProps}){
        console.log(flowersAndCardProps);
        return (
            <div className="cardAndFlowerItem">
                <div className="cardAndFlowerPicture">
                    {cardData[flowersAndCardProps.id].image}
                </div>
                <div className="titleAndGreeting">
                    <h2>{capitalizeFirstLetter(flowersAndCardProps.size) + " flowers and card"}</h2>
                    <h5>Customized greeting:</h5>
                    <p>{flowersAndCardProps.greeting}</p>
                </div>
                <div className="bouquetPriceDiv">
                    <h2>{flowersAndCardProps.price + ";-"}</h2>
                </div>
            </div>
        )
    }

    function PopupOverlay () {

        return(
            <div id="popupOverlay" className={showOverlay}>
                <div className="popupMessage">
                        <div className="exitButton"><h3 onClick={closeOverlay}>X</h3></div>
                        <h2>Would you like to add flowers and a card to your order?</h2>
                        <div className="popupIcons">
                            <img src={popupCard} alt="card"/>
                            <h1>+</h1>
                            <img src={popupFlowers} alt="flowers"/>
                        </div>
                        <button className="addFlowersAndCardbutton" onClick={goToCardsAndFlowersView}>Let's do it!</button>
                </div>
            </div>
        )
    }

    return(
        <div className="orderAndFlowersDiv">
            {props.state.flowersAndCard.id === undefined ?<PopupOverlay/> : null}
            <TopBackgroundCurveShape />
            <MenuTopBarWithNavIcons leftItem="menu" />
            <h1>Your order</h1>
            <h3>Is everything correct?</h3>
            <div className="orderItems">
                {props.state.cartItems.map(function (item){
                    return item.amount !== 0 ? <OrderItem id={item.id} amount={item.amount}/> : null;
                })}
                {props.state.flowersAndCard.size !== undefined ? <DisplayFlowersAndCard flowersAndCardProps={props.state.flowersAndCard}/> : null}
            </div>
            {props.state.totalAmount === 0 ? <button className="continueButton">Nothing to checkout!</button> : <button className="continueButton" onClick={goToPaymentView}>To checkout {props.state.totalAmount};-</button>}
        </div>
    )
}

export default OrderView;