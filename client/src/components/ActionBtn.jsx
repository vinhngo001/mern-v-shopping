import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState';
import { Link } from "react-router-dom"

const BtnRender = ({ product, deleteProduct }) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <>
            {
                isAdmin
                    ? <>
                        <Link id="btn_buy" to="#!"
                            onClick={() => deleteProduct(product._id, product.images.public_id)}>
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/product/edit/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    : <>
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                            Buy
                        </Link>
                        <Link id="btn_view" to={`/product/detail/${product._id}`}>
                            View
                        </Link>
                    </>
            }
        </>
    )
}

export default BtnRender