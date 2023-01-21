import React, { useContext } from 'react';
import { GlobalState } from '../GlobalState';
import { Link } from "react-router-dom"

const BtnRender = ({ product, deleteProduct }) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className='purchase-info'>
            {
                isAdmin
                    ? <>
                        <Link id="btn_buy" to="#!"
                            onClick={() => deleteProduct(product._id, product.images.public_id)} className="btn btn_buy">
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/product/edit/${product._id}`} className="btn btn_view">
                            Edit
                        </Link>
                    </>
                    : <>
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)} className="btn btn_buy">
                            Buy
                        </Link>
                        <Link id="btn_view" to={`/product/detail/${product._id}`} className="btn btn_view">
                            View
                        </Link>
                    </>
            }
        </div>
    )
}

export default BtnRender