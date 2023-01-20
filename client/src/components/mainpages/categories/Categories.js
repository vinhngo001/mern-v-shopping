import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { patchDataAPI, postDataAPI } from "../../../utils/fetchData";

const Categories = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [token] = state.token;
    
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [category, setCategory] = useState("");
    const [id, setID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await patchDataAPI(`api/category/${id}`, {
                    name: category
                }, token);
                alert(res?.data?.message);
            } else {
                const res = await postDataAPI('api/category', {
                    name: category
                }, token);
                alert(res?.data?.message);
            }
            setOnEdit(false);
            setCategory("");
            setCallback(!callback);
        } catch (err) {
            console.log(err);
            alert(err !== undefined && err?.response?.data?.message)
        }
    }
    const editCategory = (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    }

    const deleteCategory = (id) => {

    }
    return (
        <div className="categories">
            <form  onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
            <div className="col">
            {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories;