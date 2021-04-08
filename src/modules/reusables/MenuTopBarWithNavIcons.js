import React, { useState, useEffect } from 'react';
import '../../styles/css/menuTopBarWithNavIcons.css';

import { useHistory } from 'react-router-dom';

import cart from '../../assets/topNavBarAssets/cart.png';
import cartWithItems from '../../assets/topNavBarAssets/cart-with-item.png';
import favorite from '../../assets/topNavBarAssets/favorite.png';
import menu from '../../assets/topNavBarAssets/menu.png';
import goBack from '../../assets/topNavBarAssets/goBack.png';

function MenuTopBarWithNavIcons(props) {

    const history = useHistory();

    const [renderedLeftOption, setRenderedLeftOption] = useState();
    const [renderedRightOption, setRenderedRightOption] = useState();

    function backToPreviousScreen(){
        history.goBack();
    }
    
    useEffect(() => {
        switch(props.leftItem){
            case "menu":
                setRenderedLeftOption(<img src={menu} onClick={() => props.leftItemOnClick()} alt="Open menu"/>)
                break;
            case "goBack":
                setRenderedLeftOption(<img src={goBack} onClick={() => props.leftItemOnClick ? props.leftItemOnClick() : backToPreviousScreen()} alt="Go back"/>)
                break;
            default:
                setRenderedLeftOption(null);
        }

        switch(props.rightItem){
            case "favorite":
                setRenderedRightOption(<img src={favorite} onClick={() => props.righItemOnClick()} alt="Favorite this item" className="heart"/>)
                break;
            case "cart":
                setRenderedRightOption(<img src={props.totalItems > 0 ? cartWithItems : cart} onClick={() => props.rightItemOnClick()} alt="Check your shopping cart" className="cart"/>)
                break;
            case "menu":
                setRenderedRightOption(<img src={menu} onClick={() => props.rightItemOnClick()} alt="Open menu"/>)
                break;
            default:
                setRenderedRightOption(null);
        }
    }, [props])

    return (
        <div className="menuTopBarWithNavIcons">
            {renderedLeftOption}
            {renderedRightOption}
        </div>
    )
}

export default MenuTopBarWithNavIcons;