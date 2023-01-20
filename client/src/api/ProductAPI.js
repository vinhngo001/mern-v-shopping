import { useEffect, useState } from "react";
import { getDataAPI } from "../utils/fetchData";

function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await getDataAPI('/api/product');
                setProducts(res.data.results);
            } catch (err) {
                alert(err?.response?.data?.message);
            }
        }

        getAllProducts();
    });

    return {
        products: [products, setProducts],
        callback: [callback, setCallback]
    }

}

export default ProductAPI;