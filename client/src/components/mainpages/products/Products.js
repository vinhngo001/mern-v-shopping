import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Filter from "../../Filter";
import Loading from "../../Loading";
import ProductItem from "./ProductItem";

const Products = () => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const [products] = state.productAPI.products;
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const checkAll = () => {

    }

    const handleCheck = () => {

    }

    const deleteAll = () => {

    }
    const deleteProduct = () => {

    }
    if(loading) return <div><Loading /></div>
    return (
        <>
            <Filter />
            {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Delete ALL</button>
                </div>
            }
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}
                            isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    })
                }
            </div>
        </>
    )
}

export default Products;