import TopBackgroundCurveShape from './reusables/TopBackgroundCurveShape';
import MenuTopBarWithNavIcons from './reusables/MenuTopBarWithNavIcons';
import paymentOptionArray from './paymentOptionData';
import { useHistory } from 'react-router-dom';

import '../styles/css/payment.css';

function PaymentView(props) {
    const history = useHistory();

    function returnPaymentOptionAndGoToReceiptView (optionObject) {
        props.addPaymentOption(optionObject.id);
        history.push('/receipt');
    }

    function PaymentOption ({props}) {
        return (
            <div className="paymentOption" onClick={() => returnPaymentOptionAndGoToReceiptView(props)}>
                <div className="paymentImageDiv">
                {props.image}
                </div>
                <div className="paymentNameDiv">
                    <h3>{props.name}</h3>
                </div>
            </div>
        )
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log("Submitted!")
    }

    return (
        <div className="paymentViewDiv">
            <TopBackgroundCurveShape />
            <MenuTopBarWithNavIcons leftItem={"menu"} leftItemOnClick={props.manageSlideOut}/>
            <h1>Choose your payment method</h1>
            <div className="paymentOptionCollection">
                {paymentOptionArray.map(option => {
                    return <PaymentOption props={option}/>
                })}
            </div>
            <h3>Add discount code:</h3>
            <form className="discountCodeForm" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" className="discountCodeInput"/>
                <input type="submit" className="submitButton"/>
            </form>
        </div>
    )
}

export default PaymentView;