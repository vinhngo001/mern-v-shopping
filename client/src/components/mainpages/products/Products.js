import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Filter from "../../Filter";
import Loading from "../../Loading";
import ProductItem from "./ProductItem";
import { deleteDataAPI, postDataAPI } from "../../../utils/fetchData"
const Products = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin;
    const [products, setProducts] = state.productAPI.products;
    const [callback, setCallback] = state.productAPI.callback;

    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }
    const deleteProduct = async (id, public_id) => {
        try {
            const destroyImg = await postDataAPI('/api/upload/destroy', {public_id}, token);
            const deleteProduct = await deleteDataAPI(`/api/product/${id}`, token);

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (error) {
            console.log(error.response);
            alert(error?.response?.data.message)
        }
    }
    if (loading) return <div><Loading /></div>
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