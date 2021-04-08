import {
  Route,
  BrowserRouter as Router,
  useHistory
} from 'react-router-dom';
import React, { useEffect, useReducer, useState } from 'react';

import './styles/css/App.css';

import soupOnline from './assets/soupOnline.png';
import coupons from './assets/slideOutMenuAssets/coupons.png';
import foodMenu from './assets/slideOutMenuAssets/foodMenu.png';
import heart from './assets/slideOutMenuAssets/heart.png';
import help from './assets/slideOutMenuAssets/help.png';
import more from './assets/slideOutMenuAssets/more.png';
import myOrders from './assets/slideOutMenuAssets/myOrders.png';
import profile from './assets/slideOutMenuAssets/profile.png';
import signOut from './assets/slideOutMenuAssets/signOut.png';

import LoginScreen from './modules/loginScreen';
import Maps from './modules/maps';
import MenuView from './modules/menu';
import OrderView from './modules/order';
import EditFlowersAndCardView from './modules/card';
import PaymentView from './modules/payment';
import ReceiptView from './modules/receipt';
import TrackingView from './modules/tracking';
import ShareView from './modules/share';

import itemData from './modules/itemData';
import cardData from './modules/cardData';

function App() {
    const initialCartItemArray = [
        {
            id: 0,
            amount: 0,
        },
        {
            id: 1,
            amount: 0,
        },
        {
            id: 2,
            amount: 0,
        },
        {
            id: 3,
            amount: 0,
        },
        {
            id: 4,
            amount: 0,
        },
        {
            id: 5,
            amount: 0,
        },
        {
            id: 6,
            amount: 0,
        },
        {
            id: 7,
            amount: 0,
        },
    ]

    const slideOutMenuItemsArray = [
        {
            id: 0,
            displayedText: "Go to food menu",
            icon: <img src={foodMenu} alt=""/>
        },
        {
            id: 1,
            displayedText: "My account",
            icon: <img src={profile} alt=""/>
        },
        {
            id: 2,
            displayedText: "My orders",
            icon: <img src={myOrders} alt=""/>
        },
        {
            id: 3,
            displayedText: "Favorites",
            icon: <img src={heart} alt=""/>
        },
        {
            id: 4,
            displayedText: "Coupons",
            icon: <img src={coupons} alt=""/>
        },
        {
            id: 5,
            displayedText: "Help",
            icon: <img src={help} alt=""/>
        },
        {
            id: 0,
            displayedText: "More",
            icon: <img src={more} alt=""/>
        },
    ]

    const initialState = {
        cartItems: initialCartItemArray,
        totalItems: 0,
        totalAmount: 0,
        mapLatLng: [59.334591, 18.063240],
        latestEntry: null,
        flowersAndCard: {},
    }

    //App state/reducer

    const reducer = (state, action) => {
        switch(action.type){
            case 'addToCartItems':
                let newCartItemsArray = state.cartItems.map(itemObject => {
                    var returnValue = {...itemObject};

                    if (itemObject.id === action.item) {
                        returnValue.amount = state.cartItems[action.item].amount + 1;
                    };

                    return returnValue;
                })

                return {                
                    ...state,
                    cartItems: newCartItemsArray,
                    totalItems: state.totalItems + 1,
                    totalAmount: state.totalAmount + itemData[action.item].price,
                    latestEntry: itemData[action.item].name,
                };

            case 'addFlowersAndCard':
                return{
                    ...state,
                    flowersAndCard: {
                        id: action.item.id,
                        size: cardData[action.item.id].size,
                        price: cardData[action.item.id].price,
                        greeting: action.item.greeting,
                    },
                    totalAmount: state.totalAmount + cardData[action.item.id].price,
                }

            case 'editMapPosition':
                return {
                    ...state,
                    mapLngLt: action.location,
                }

            case 'addPaymentOption':
                return{
                    ...state,
                    paymentOptionId: action.optionId
                }

            case 'editFoodItemAmount':
                let newCartItemsArray2 = state.cartItems.map(itemObject => {
                    var returnValue = {...itemObject};

                    if (itemObject.id === action.id) {
                        returnValue.amount = action.amount;
                    };

                    return returnValue;
                })

                let amountToChangeBy = action.amount - state.cartItems[action.id].amount;

                return {                
                    ...state,
                    cartItems: newCartItemsArray2,
                    totalItems: state.totalItems + amountToChangeBy,
                    totalAmount: state.totalAmount + itemData[action.id].price * amountToChangeBy,
                    latestEntry: itemData[action.id].name,
                };

            default:
                throw new Error();
        }
    }

  //App hooks

  const [state, dispatch] = useReducer(reducer, initialState);
  const [previousTotalItems, setPreviousTotalItems] = useState();
  const [dropdownIsActive, setDropDownIsActive] = useState("hide");
  const [slideOutMenuIsActive, setSlideOutMenuIsActive] = useState("hide");


  //Displays dropdown when totalitems change
  useEffect(() => {
    if(state.totalItems === 0){
        return;
    }
    else {
        setDropDownIsActive("show");
        setTimeout(() => setDropDownIsActive("hide"), 1500);
    }
  }, [state.totalItems])

  

  //Reducer functions
  function addItemToCart (item) {
    dispatch({ type: 'addToCartItems', item});
  }

  function addCardAndFlowers (item) {
    dispatch({type: 'addFlowersAndCard', item})
  }

  function editLocation (location) {
    dispatch({type: 'editMapPosition', location})
  }

  function addPaymentOption (optionId) {
    dispatch({type: 'addPaymentOption', optionId})
  }

  function editFoodItemAmount (id, amount) {
      dispatch({type: 'editFoodItemAmount', id, amount})
  }

  //Dropdown annotation
  function DropdownAnnotation(){
      const displayedString = state.latestEntry != null ? state.latestEntry : null;

      const [addedOrRemoved, setAddedOrRemoved] = useState("added");

      useEffect(() => {
          if(previousTotalItems > state.totalItems){
            setAddedOrRemoved("removed");
          }
          else if(previousTotalItems < state.totalItems){
              setAddedOrRemoved("added")
          };
          console.log(previousTotalItems, state.totalItems)
          

          setTimeout(() => {
            setPreviousTotalItems(state.totalItems);
          }, 1600)
      })

      return(
        <div id="dropDownAnnotation" className={dropdownIsActive}>
            <p>{displayedString + " was " + addedOrRemoved + " to your cart"}</p>
        </div>
      )
  }


  function SlideOutMenu(){
    const history = useHistory()

    function goBackToFoodMenu(){
        history.push("/menu");
    }

    function SlideOutMenuItem({item}){

        return (
            <div className="slideOutMenuItem" onClick={item.id === 0 ? goBackToFoodMenu : null}>
                {item.icon}
                <h4>{item.displayedText}</h4>
            </div>
        )
    }

      return(
          <div id="slideOutMenu" className={slideOutMenuIsActive}>
              <img src={soupOnline} alt="Soup online logo" className="soupOnlineLogo"/>
              <div className="slideOutMenuItemCollection">
                    {slideOutMenuItemsArray.map(item => {
                        return <SlideOutMenuItem item={item}/>
                    })}
              </div>
              <div className="signOutDiv">
                  <img src={signOut} alt=""/>
                  <h3>Sign out</h3>
              </div>
          </div>
      )
  }



  function manageSlideOut(){
    slideOutMenuIsActive === "show" ? setSlideOutMenuIsActive("hide") : setSlideOutMenuIsActive("show");
  }


  return (
    <Router>
        <div className="App">
            <DropdownAnnotation/>
            <SlideOutMenu/>
            <div className="routeParentDiv" onClick={slideOutMenuIsActive === "show" ? manageSlideOut : null}>
                <Route exact path="/" component={LoginScreen}/>
                <Route path="/map" render={(props) => <Maps {...props} editLocation={editLocation} state={state}/>}/>
                <Route path="/menu" render={(props) => <MenuView {...props} manageSlideOut={manageSlideOut} addItemToCart={addItemToCart} state={state}/>}/>
                <Route path="/order" render={(props) => <OrderView {...props} manageSlideOut={manageSlideOut} editFoodItemAmount={editFoodItemAmount} state={state}/>}/>
                <Route path="/card+and+flowers" render={(props) => <EditFlowersAndCardView {...props} manageSlideOut={manageSlideOut} addCardAndFlowers={addCardAndFlowers}/>}/>
                <Route path="/payment" render={(props) => <PaymentView {...props} manageSlideOut={manageSlideOut} addPaymentOption={addPaymentOption} state={state}/>}/>
                <Route path="/receipt" render={(props) => <ReceiptView {...props} state={state}/>}/>
                <Route path="/tracking" render={(props) => <TrackingView {...props} manageSlideOut={manageSlideOut} state={state}/>}/>
                <Route path="/sharing" render={(props) => <ShareView {...props} manageSlideOut={manageSlideOut} state={state}/>}/>
            </div>
        </div>
    </Router>
  );
}

export default App;