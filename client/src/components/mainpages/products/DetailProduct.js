import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const DetailProduct = () => {
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products
    const addCart = state.userAPI.addCart
    const { id } = useParams();
    const [product, setProduct] = useState(false);
    useEffect(() => {
        if (id) {
            product.forEach(product => {
                if (product._id === id) {
                    setProduct(product);
                }
            });
        }
    }, [id, products]);

    return (
        <>
            <div className="detail">
                <img src={product.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{product.title}</h2>
                        <h6>#id: {product.product_id}</h6>
                    </div>
                    <span>$ {product.price}</span>
                    <p>{product.description}</p>
                    <p>{product.content}</p>
                    <p>Sold: {product.sold}</p>
                    <Link to="/cart" className="cart"
                        onClick={() => addCart(product)}>
                        Buy Now
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DetailProduct;