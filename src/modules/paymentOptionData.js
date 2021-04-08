import applePay from '../assets/paymentAssets/applePay.png';
import creditCard from '../assets/paymentAssets/creditCard.png';
import paypal from '../assets/paymentAssets/paypal.png';
import swish from '../assets/paymentAssets/swish.png';

const paymentOptionArray = [
    {
        name: "Apple Pay",
        image: <img src={applePay} alt="Apple Pay"/>,
        id: 0
    },
    {
        name: "PayPal",
        image: <img src={paypal} alt="Paypal"/>,
        id: 2
    },
    {
        name: "Credit card",
        image: <img src={creditCard} alt="Credit card"/>,
        id: 2
    },
    {
        name: "Swish",
        image: <img src={swish} alt="Swish"/>,
        id: 3
    },
]

export default paymentOptionArray;