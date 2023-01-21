import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "./ProductItem";

const DetailProduct = () => {
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const addCart = state.userAPI.addCart;
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (id) {
            products.forEach(product => {
                if (product._id === id) {
                    setProduct(product);
                }
            });
        }
    }, [id, products]);

    if(product.length === 0) return null;
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

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(p => {
                            return p.category === product.category 
                                ? <ProductItem key={p._id} product={p} /> 
                                : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;