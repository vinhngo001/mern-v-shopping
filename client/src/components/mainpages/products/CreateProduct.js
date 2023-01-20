import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from '../../../GlobalState'
import Loading from "../../Loading";
import { useHistory, useParams } from 'react-router-dom'
import { postDataAPI } from "../../../utils/fetchData";
import { checkImage } from "../../../utils/fileUpload";
import axios from "axios";

const CreateProduct = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [isAdmin] = state.userAPI.isAdmin;
    const [products] = state.productAPI.products;
    const [token] = state.token;

    const [upload, setUpload] = useState("");
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: 0,
        description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
        content: 'Welcome to Dev-VN. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.',
        category: '',
        _id: ''
    });

    useEffect(() => {
        if (id) {
            setOnEdit(true);
            products.forEach((item) => {
                if (item._id === id) {
                    setProduct(item);
                }
            })
        }
    }, [id])

    const [onEdit, setOnEdit] = useState(false);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert("You're not an admin");

            const file = e.target.files[0];
            console.log(">>>>>>",file);
            let err = checkImage(file)
            if (err) return alert(err);

            setLoading(true);
            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload/create', {
                formData
            }, {
                // withCredentials: true,
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            setLoading(false);
            setImages(res.data.results);
        } catch (err) {
            alert(err !== undefined && err?.response?.data?.message);
        }
    }

    const handleChangeInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postDataAPI('/api/product', {
                ...product,
                images
            }, token);
            history.push("/");
        } catch (err) {
            console.log(err);
            alert(err !== undefined && err?.response?.data?.message);
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    const handleDelete = async (e) => {
        try {
            setLoading(true);
            await axios.post('/api/upload/destroy', { public_id: images.public_id }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            setImages(false);
        } catch (err) {
            console.log(err);
            alert(err !== undefined && err?.response?.data?.message);
        }
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDelete}>X</span>
                        </div>
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct;