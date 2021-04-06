import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import React, { useEffect, useReducer, useState } from 'react';

import './styles/css/App.css';

import LoginScreen from './modules/loginScreen';
import Maps from './modules/maps';
import MenuView from './modules/menu';
import OrderView from './modules/order';
import EditFlowersAndCardView from './modules/card';
import PaymentView from './modules/payment';
import ReceiptView from './modules/receipt';
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

    const initialState = {
        cartItems: initialCartItemArray,
        totalItems: 0,
        totalAmount: 0,
        latestEntry: null,
        flowersAndCard: {},
    }

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
            default:
                throw new Error();
        }
    }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [dropdownIsActive, setDropDownIsActive] = useState("hide");


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


  //Dropdown annotation
  function DropdownAnnotation(){
      const displayedString = state.latestEntry != null ? state.latestEntry : null;

      return(
        <div id="dropDownAnnotation" className={dropdownIsActive}>
            <p>{displayedString + " was added to your cart"}</p>
        </div>
      )
  }



  return (
    <Router>
        <div className="App">
            <DropdownAnnotation/>
            <Route exact path="/" component={LoginScreen}/>
            <Route path="/map" component={Maps}/>
            <Route path="/menu" render={(props) => <MenuView {...props} addItemToCart={addItemToCart} state={state}/>}/>
            <Route path="/order" render={(props) => <OrderView {...props} addItemToCart={addItemToCart} state={state}/>}/>
            <Route path="/card+and+flowers" render={(props) => <EditFlowersAndCardView {...props} addCardAndFlowers={addCardAndFlowers}/>}/>
            <Route path="/payment" component={PaymentView}/>
            <Route path="/receipt" render={(props) => <ReceiptView {...props} state={state}/>}/>
        </div>
    </Router>
  );
}

export default App;