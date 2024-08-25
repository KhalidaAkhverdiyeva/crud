import { Product } from 'app/types/product';
import { createProduct, fetcher } from '../http/fetcher';
import { validationSchema } from 'app/validator/AddCardValidation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import useSWR from 'swr';

const AddCardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { mutate } = useSWR<Product[]>("http://localhost:3001/products", fetcher);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(true);
        try {
            const newProduct = {
                title: values.title,
                description: values.description,
                price: values.price,
                rating: values.rating,
                image: previewUrl ? [previewUrl] : [], 
                tags: values.tags, 
                
            };

            const response = await createProduct(newProduct);
            mutate();
            onClose();
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleStar = (star: number, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('rating', star);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setPreviewUrl(e.target.result as string);
                    setFieldValue('images', e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
            setFieldValue('images', ''); 
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" style={{ marginLeft: '0', marginRight: '0' }}>
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                <button 
                    className="absolute top-3 right-3 text-gray-500 text-[30px] hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        rating: 0,
                        price: '',
                        images: '',
                        tags: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <Field name="title" placeholder="Product Name" type="text" className="mt-1 border-[1px] border-solid border-gray-400 py-2 px-3 block w-full rounded-[6px] text-[16px] shadow-sm focus:border-gray-900" />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-[12px] mt-1" />
                            </div>

                            <div className="mb-4">
                                <Field name="description" as="textarea" placeholder="Description" className="mt-1 py-2 px-3 block w-full border-[1px] border-solid border-gray-400 rounded-[6px] shadow-sm" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-[12px] mt-1" />
                            </div>

                            <div className="flex gap-[30px] ">
                                <div className='mb-4 flex-1'>
                                    <label className="block text-gray-700">Rating</label>
                                    <div className="flex space-x-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={`cursor-pointer text-2xl ${star <= values.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                onClick={() => handleStar(star, setFieldValue)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <ErrorMessage name="rating" component="div" className="text-red-500 text-[12px] mt-1" />
                                </div>

                                <div className="mb-4 flex-1 relative">
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="hidden"
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                    />
                                    <label
                                        htmlFor='image'
                                        className="block w-[180px] h-[100px] rounded-[6px] shadow-sm overflow-hidden cursor-pointer relative"
                                        style={{
                                            backgroundImage: `url(${previewUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0a5ifQMQk61Z64YSK4hrS7M6lk3pS7VtNA&s'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        {previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        )}
                                    </label>
                                    <ErrorMessage name='images' component="div" className="text-red-500 text-[12px] mt-1" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <Field name="price" type="number" placeholder="Price" className="mt-1 py-1 px-3 block w-full border-[1px] border-solid border-gray-400 rounded-[6px] shadow-sm" />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-[12px] mt-1" />
                            </div>

                            <div className="mb-4">
                                <Field name="tags" type="text" placeholder='Tag' className="mt-1 py-1 px-2 block w-full border-[1px] border-solid border-gray-400 rounded-[6px] shadow-sm" />
                                <ErrorMessage name="tags" component="div" className="text-red-500 text-[12px] mt-1" />
                            </div>

                            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-[6px]" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddCardModal;
