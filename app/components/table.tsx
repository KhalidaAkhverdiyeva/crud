'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import LoadingSpinner from './loadingspinner';
import { deleteProduct, fetcher, updateProduct, createProduct } from 'app/http/fetcher';
import useSWR from 'swr';
import { FormValues } from '../types/formValues';
import { Product } from 'app/types/product';

const Table = () => {
    const { data: products, error, mutate } = useSWR<Product[]>("http://localhost:3001/products", fetcher);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        description: '',
        rating: 1,
        price: '',
        tags: '',
        image: null
    });
    const [newProduct, setNewProduct] = useState<FormValues>({
        name: '',
        description: '',
        rating: 1,
        price: '',
        tags: '',
        image: null
    });

    const handleEdit = (id: number) => {
        setEditingId(id);
        const product = products?.find(p => p.id === id);
        if (product) {
            setFormValues({
                name: product.title,
                description: product.description,
                rating: product.rating,
                price: product.price,
                tags: product.tags,
                image: null // Reset image for editing
            });
        }
    };

    const handleSave = async (id: number) => {
        try {
            const updatedProduct = { ...formValues };
            if (formValues.image) {
                // Handle image upload logic here if needed
            }
            await updateProduct(id, updatedProduct);
            mutate(); // Refresh the SWR data
            setEditingId(null);
        } catch (error) {
            console.error("Error saving product", error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormValues(prev => ({ ...prev, image: file }));
    };

    const handleNewProductChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleNewFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewProduct(prev => ({ ...prev, image: file }));
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            mutate(); 
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const newProductData = { ...newProduct };
            if (newProduct.image) {
                // Handle image upload logic here if needed
            }
            await createProduct(newProductData);
            mutate(); // Refresh the SWR data
            setNewProduct({ name: '', description: '', rating: 1, price: '', tags: '', image: null }); // Reset form
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    if (error) return <p>Error happened</p>;
    if (!products) return <div><LoadingSpinner /></div>;

    return (
            <table className="w-[1200px] divide-y divide-gray-200 my-[30px]">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Product Name</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Description</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Rating</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Price</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Tags</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase ">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className='flex gap-[10px] items-center'>
                                {editingId === product.id ? (
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="border border-gray-300 p-1 rounded"
                                    />
                                ) : (
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-full" />
                                )}
                                {editingId === product.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-1 rounded"
                                    />
                                ) : (
                                        product.title
                                  
                                )}
                                </div>
                               
                            </td>
                            <td className="pl-6 py-4  text-sm text-gray-500">
                                {editingId === product.id ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-1 rounded text-[14px]"
                                    />
                                ) : (
                                    product.description
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editingId === product.id ? (
                                    <select
                                        name="rating"
                                        value={formValues.rating}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-1 rounded"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>
                                                {n} Star{n > 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="flex items-center text-yellow-500">
                                        {'★'.repeat(product.rating)}
                                        {'☆'.repeat(5 - product.rating)}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editingId === product.id ? (
                                    <input
                                        type="text"
                                        name="price"
                                        value={formValues.price}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-1 rounded"
                                    />
                                ) : (
                                    <div className="flex items-center">
                                        {product.price}
                                        <span className="mr-1">$</span>
                                    </div>

                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editingId === product.id ? (
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formValues.tags}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-1 rounded"
                                    />
                                ) : (
                                    product.tags
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {editingId === product.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(product.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="ml-2 bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="ml-2 bg-black text-white px-3 py-1 rounded hover:bg-gray-00"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    );
};

export default Table;
