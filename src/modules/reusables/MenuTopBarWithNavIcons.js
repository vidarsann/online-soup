import React, { useState, useEffect } from 'react';
import '../../styles/css/menuTopBarWithNavIcons.css';

import cart from '../../assets/topNavBarAssets/cart.png';
import cartWithItems from '../../assets/topNavBarAssets/cart-with-item.png';
import favorite from '../../assets/topNavBarAssets/favorite.png';
import menu from '../../assets/topNavBarAssets/menu.png';

function MenuTopBarWithNavIcons(props) {

    const [renderedLeftOption, setRenderedLeftOption] = useState();
    const [renderedRightOption, setRenderedRightOption] = useState();

    console.log(props)
    
    useEffect(() => {
        switch(props.leftItem){
            case "menu":
                setRenderedLeftOption(<img src={menu} onClick={() => props.leftItemOnClick()} alt="Open menu"/>)
                break;
            case "goBack":
                setRenderedLeftOption(<h1 onClick={() => props.leftItemOnClick()}>{"<"}</h1>)
                break;
            default:
                setRenderedLeftOption(null);
        }

        switch(props.rightItem){
            case "favorite":
                setRenderedRightOption(<img src={favorite} onClick={() => props.righItemOnClick()} alt="Favorite this item" className="heart"/>)
                break;
            case "cart":
                setRenderedRightOption(<img src={props.totalItems === 0 ? cart : cartWithItems} onClick={() => props.rightItemOnClick()} alt="Check your shopping cart" className="cart"/>)
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