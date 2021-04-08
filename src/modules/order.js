import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import itemData from './itemData';
import cardData from './cardData';

import popupFlowers from '../assets/cardAndFlowersAssets/popupFlowers.png';
import popupCard from '../assets/cardAndFlowersAssets/popupCard.png';

import '../styles/css/order.css';
import { useState } from 'react';

function OrderView (props) {

    const options = [
        { value: 0, label: 'x0' },
        { value: 1, label: 'x1' },
        { value: 2, label: 'x2' },
        { value: 3, label: 'x3' },
        { value: 4, label: 'x4' },
        { value: 5, label: 'x5' },
        { value: 6, label: 'x6' },
        { value: 7, label: 'x7' },
        { value: 8, label: 'x8' },
        { value: 9, label: 'x9' },
        { value: 10, label: 'x10' },
    ]

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

        function handleChange(e){
            props.editFoodItemAmount(itemProps.id, e.value)
        }

        return (
            <div className="orderItem">
                <div className="pictureAndQuantity">
                    {itemData[itemProps.id].image}
                    <Select options={options} value={options[itemProps.amount]} onChange={handleChange} className={"dropDownController"}/>
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
        return (
            <div className="cardAndFlowerItem">
                <div className="iconTitleDiv">
                    <div className="cardAndFlowerPicture">
                        {cardData[flowersAndCardProps.id].image}
                    </div>
                    <div className="titleAndGreeting">
                        <h2>{capitalizeFirstLetter(flowersAndCardProps.size) + " flowers and card"}</h2>
                        <h5>Customized greeting:</h5>
                        <p>{flowersAndCardProps.greeting}</p>
                    </div>
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
            <MenuTopBarWithNavIcons leftItem="menu" leftItemOnClick={props.manageSlideOut}/>
            <h1>Your order</h1>
            <h3>Is everything correct?</h3>
            <div className="orderItems">
                {props.state.cartItems.map(item => {
                    return item.amount !== 0 ? <OrderItem id={item.id} amount={item.amount}/> : null;
                })}
                {props.state.flowersAndCard.size !== undefined ? <DisplayFlowersAndCard flowersAndCardProps={props.state.flowersAndCard}/> : null}
            </div>
            {props.state.totalAmount === 0 ? <button className="continueButton">Nothing to checkout!</button> : <button className="continueButton" onClick={goToPaymentView}>To checkout {props.state.totalAmount};-</button>}
        </div>
    )
}

export default OrderView;