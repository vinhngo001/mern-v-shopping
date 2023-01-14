import { useState, useEffect } from 'react';
import { getDataAPI } from '../utils/fetchData';

function CategoryAPI() {
	const [categories, setCategories] = useState([]);
	const [callback, setCallback] = useState(false);

	useEffect(() =>{
        const getCategories = async () =>{
            const res = await getDataAPI('api/category');
            setCategories(res.data.results)
        }

        getCategories()
    },[callback])

	return {
		categories: [categories, setCategories],
		callback: [callback, setCallback]
	}
}

export default CategoryAPI;