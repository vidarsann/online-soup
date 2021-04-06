import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import { useHistory } from 'react-router-dom';

import '../styles/css/payment.css';

import applePay from '../assets/paymentAssets/applePay.png';
import creditCard from '../assets/paymentAssets/creditCard.png';
import paypal from '../assets/paymentAssets/paypal.png';
import swish from '../assets/paymentAssets/swish.png';

function PaymentView() {
    const history = useHistory();

    function goToReceiptView () {
        history.push('/receipt');
    }

    const paymentOptionArray = [
        {
            name: "Apple Pay",
            image: <img src={applePay} alt="Apple Pay"/>
        },
        {
            name: "PayPal",
            image: <img src={paypal} alt="Paypal"/>
        },
        {
            name: "Credit card",
            image: <img src={creditCard} alt="Credit card"/>
        },
        {
            name: "Swish",
            image: <img src={swish} alt="Swish"/>
        },
    ]

    function PaymentOption ({props}) {
        return (
            <div className="paymentOption" onClick={goToReceiptView}>
                <div className="paymentImageDiv">
                {props.image}
                </div>
                <div className="paymentNameDiv">
                    <h3>{props.name}</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="paymentViewDiv">
            <TopBackgroundCurveShape />
            <MenuTopBarWithNavIcons leftItem={"menu"} />
            <h1>Choose your payment method</h1>
            <div className="paymentOptionCollection">
                {paymentOptionArray.map(option => {
                    return <PaymentOption props={option}/>
                })}
            </div>
            <h3>Add discount code:</h3>
            <form className="discountCodeForm">
                <input type="text" className="discountCodeInput"/>
                <input type="submit" className="submitButton"/>
            </form>
        </div>
    )
}

export default PaymentView;