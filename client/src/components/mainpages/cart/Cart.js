import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import PaypalButton from "./PaymentButton";

const Cart = () => {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);
    const decrement = ()=>{

    }

    const increment = () =>{

    }
    const removeProduct = () => {

    }

    const tranSuccess = async()=>{
        
    }

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete"
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart;