import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import bouquetItems from './cardData';

import '../styles/css/cardsAndFlowers.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditFlowersAndCardView(props){
    const [selectedBouquetId, setSelectedBouquetId] = useState();
    const [customGreeting, setCustomGreeting] = useState();

    const history = useHistory();

    function saveStateAndGoBack () {
        props.addCardAndFlowers({id: selectedBouquetId, greeting: customGreeting});
        history.push('/order');
    }

    function onChangeBouquet(event) {
        setSelectedBouquetId(parseInt(event.target.value))
    }

    function onChangeGreeting (event) {
        setCustomGreeting(event.target.value)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function RenderBouquetOptions () {
        return(
            <div className="bouquetOptions">
                {bouquetItems.map((item) => {
                    return(
                        <div className="bouquetItem">
                            <input type="radio" value={item.id} onChange={onChangeBouquet} checked={selectedBouquetId === item.id}/>
                            {item.image}
                            <h3 className={item.size + "h3"}>{capitalizeFirstLetter(item.size)}</h3>
                            <h3>{item.price + ";-"}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <div className="cardsAndFlowersView">
            <TopBackgroundCurveShape />
            <MenuTopBarWithNavIcons leftItem="menu" />
            <h1>Customize your card</h1>
            <div className="chooseBouquetDiv">
                <h2>Choose bouquet size</h2>
                <RenderBouquetOptions/>
            </div>
            <textarea className="customizedGreetingTextArea" placeholder="Add a customized greeting" value={customGreeting} onChange={onChangeGreeting}/>
            <button className="continueButton" onClick={saveStateAndGoBack}>Continue</button>
        </div>
    )
}

export default EditFlowersAndCardView;