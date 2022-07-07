import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';

const StrieCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;
    const getfinalPrice = () => {
        let total = 0;
        products.map(p => {
            total += p.price;
        });
        return total;
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success">
                Your order has been placed successfully. Thank you for shopping.
              </div>
            </div>
          </div>
        );
      };

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response);

            const { status } = response;
            console.log("STATUS: ",status);
            cartEmpty(
                () => {
                    console.log("Cart is empty");
                }
            );
            setReload(!reload);
            setData({
                ...data,
                loading: false,
                success: true
            });  
        })
        .catch(err => {
            console.log(err);
        });


    }


    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
                stripeKey ="pk_test_51LEUjMSDBlRF3E6yX9jRekWFDL7KWjviMnz3WSnXHF3BZSnPOBla593ZeQ71tCDWm05NVzyhIPhw8XKt7Bo65dGr00KzIov9ML"
                token = {makePayment}
                amount = {getfinalPrice() * 100}
                name = "Pay to Outfit Haul"
                billingAddress
                shippingAddress
                description = {`Your total is $${getfinalPrice()}`}
                panelLabel = "Pay Now"
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign in to pay</button>
            </Link>
        );
    }



  return (
    <div className='text-dark'>
        StrieCheckout {getfinalPrice()}
        {showStripeButton()}
    </div>
  )
}

export default StrieCheckout;