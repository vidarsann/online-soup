import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import './itemData';
import './reusables/MenuTopBarWithNavIcons';
import "react-alice-carousel/lib/alice-carousel.css";
import '../styles/css/menu.css';

import menuSlider1 from '../assets/menuSliders/menuSlider1.png';
import menuSlider2 from '../assets/menuSliders/menuSlider2.jpg';
import menuSlider3 from '../assets/menuSliders/menuSlider3.jpg';
import menuSlider4 from '../assets/menuSliders/menuSlider4.jpg';
import vegetarianIcon from '../assets/menuItemProps/vegetarian.png'
import basketIcon from '../assets/basket.png'
import itemData from './itemData';

import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';

function Carousel () {
    const handleDragStart = (e) => e.preventDefault();

    const items = [
        [<img src={menuSlider1} onDragStart={handleDragStart} />, <div className="menuSliderText"><h3>Lunch of the day</h3><p>Get 20% off</p></div>],
        [<img src={menuSlider2} onDragStart={handleDragStart} />, <div className="menuSliderText"><h3>Try our lentil soup</h3><p>Delicious and nutritious!</p></div>],
        [<img src={menuSlider3} onDragStart={handleDragStart} />, <div className="menuSliderText"><h3>Share your soup online...</h3><p>...and get a discount code</p></div>],
        [<img src={menuSlider4} onDragStart={handleDragStart} />, <div className="menuSliderText"><h3>Send a soup to a loved one</h3><p>They will thank you for it!</p></div>]
    ];

    const SlideShow = <AliceCarousel
        mouseTracking
        infinite={true}
        items={items}
        disableButtonsControls={true}
    />

    return SlideShow;
}

function MenuItem(props){

    return(
        <div className="menuItemMiniature" onClick={() => props.onClickedMenuItem(props.id)}>
            <div className="titleAndVegetarian">
                <h2>{props.itemTitle}</h2>
                {props.vegetarian ? <img src={vegetarianIcon}/> : null}
            </div>
            <h3>{props.price + ";-"}</h3>
            <img src={props.imageSource} className="menuItemRoundedPicture"/>
            <img className="menuItemCircleImage"/>
            <p>{props.description}</p>
        </div>
    )
}

function ClickedMenuItemSlideOut(props) {
    console.log(props);

    const defaultItemObject = {
        id: 0,
        name: "name",
        price: 0,
        description: "description",
        vegetarian: false,
        nutrition: {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
        },
        ingredients: [
            "",
            "",
            "",
            "",
        ]
    }

    const [selectedMenuItemVisibility, setSelectedMenuItemVisibility] = useState("hide");
    const [selectedItemObjectData, setSelectedItemObjectData] = useState(defaultItemObject); 

    useEffect(() => {   
        if(Number.isInteger(props.expandedItemIndex)){
            setSelectedItemObjectData(itemData[props.expandedItemIndex])
            setSelectedMenuItemVisibility("show")
        }
        else{
            setSelectedMenuItemVisibility("hide")
        }
    }, [props.expandedItemIndex])

    function NutritionBox (nutritionProps) {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const unitMeasurement = nutritionProps.name === "calories" ? "kcal" : "g";

        return(
            <div className="nutritionBox">
                <div className="nutritionInfoAmount">
                    <h3>{nutritionProps.amount}</h3>
                </div>
                <p>{capitalizeFirstLetter(nutritionProps.name)}</p>
                <p>{unitMeasurement}</p>
            </div>
        )
    }

    return(
        <div id="clickedMenuItemSlideOut" className={selectedMenuItemVisibility}>
            <TopBackgroundCurveShape/>
            <MenuTopBarWithNavIcons leftItem={"goBack"} leftItemOnClick={props.goBackToMenu} rightItem={"favorite"}/>
            <div className="slideOutSoupMainPictureDiv">
                <img src={menuSlider1} className="slideOutSoupMainPicture" />
            </div>
            <div className="slideOutSoupInfoDiv">
                <div className="slideOutTitleAndVegetarian">
                    <h1>{selectedItemObjectData.name}</h1>
                    {selectedItemObjectData.vegetarian ? <img src={vegetarianIcon} alt="Vegetarian OK"/> : null}
                </div>
                <p>{selectedItemObjectData.description}</p>
                <div className="nutritionBoxCollection">
                    <NutritionBox name={Object.keys(selectedItemObjectData.nutrition)[0]} amount={selectedItemObjectData.nutrition.calories}/>
                    <NutritionBox name={Object.keys(selectedItemObjectData.nutrition)[1]} amount={selectedItemObjectData.nutrition.carbs}/>
                    <NutritionBox name={Object.keys(selectedItemObjectData.nutrition)[2]} amount={selectedItemObjectData.nutrition.protein}/>
                    <NutritionBox name={Object.keys(selectedItemObjectData.nutrition)[3]} amount={selectedItemObjectData.nutrition.fat}/>
                </div>
            </div>
            <div className="ingredientsAddToBasketDiv">
                <h3>Ingredients</h3>
                {selectedItemObjectData.ingredients.map(function (ingredient){
                    return (
                        <div className="ingredientDiv">
                            <img src={menuSlider1} className="ingredientPicture" alt={ingredient}/>
                            <p>{ingredient}</p>
                        </div>
                    )
                })}
                <button className="slideOutAddToBasketButton" onClick={() => props.addItemToCart(props.expandedItemIndex)}><img src={basketIcon} alt=""/>Add to basket</button>
            </div>
        </div>
    )
}

function MenuView (menuProps) {

    console.log(menuProps);
    
    const [expandedMenuItem, setExpandedMenuItem] = useState();
    const history = useHistory();

    function onClickedMenuItem(index){
        setExpandedMenuItem(index);
    }

    function goBackToMenu () {
        setExpandedMenuItem();
    }

    function goToOrderView () {
        history.push('/order');
    }

    return(
        <div className="menuWithFoodItems">
            <ClickedMenuItemSlideOut expandedItemIndex={expandedMenuItem} goBackToMenu={goBackToMenu} addItemToCart={menuProps.addItemToCart}/>
            <MenuTopBarWithNavIcons leftItem={"menu"} rightItem={"cart"} rightItemOnClick={goToOrderView} totalItems={menuProps.state.totalItems}/>
            <Carousel/>
            <div className="menuTitle">
                <h1>Menu</h1>
            </div>
            <div className="menuItemsParentDiv">
                {itemData.map(function (item) {
                    return <MenuItem
                        itemTitle={item.name}
                        imageSource={menuSlider1}
                        price={item.price}
                        description={item.description}
                        vegetarian={item.vegetarian}
                        id={item.id}
                        onClickedMenuItem={onClickedMenuItem}
                    />;
                })}
            </div>
        </div>
    );
}

export default MenuView;