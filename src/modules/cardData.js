import smallFlowers from '../assets/cardAndFlowersAssets/smallFlower.png';
import mediumFlowers from '../assets/cardAndFlowersAssets/mediumFlower.png';
import largeFlowers from '../assets/cardAndFlowersAssets/largeFlower.png';

const bouquetItems = [
    {   
        id: 0,
        size: "small",
        price: 59,
        image: <img src={smallFlowers} alt="Small flowers" className="smallFlowers"/>,
    },
    {   
        id: 1,
        size: "medium",
        price: 79,
        image: <img src={mediumFlowers} alt="Medium flowers" className="mediumFlowers"/>,
    },
    {   
        id: 2,
        size: "large",
        price: 99,
        image: <img src={largeFlowers} alt="Large flowers" className="largeFlowers"/>,
    },
]

export default bouquetItems;