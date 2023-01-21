import { useEffect, useState } from "react";
import { getDataAPI } from "../utils/fetchData";

function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await getDataAPI(`/api/product?category=${category}&sort=${sort}`);
                setProducts(res.data.results);
            } catch (err) {
                alert(err?.response?.data?.message);
            }
        }

        getAllProducts();
    }, [callback, category, sort, search, page]);

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult]
    }

}

export default ProductAPI;