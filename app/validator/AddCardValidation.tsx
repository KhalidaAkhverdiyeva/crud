
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    rating: Yup.number().required('Rating is required').min(1).max(5),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    images: Yup.string()
    .nullable()
    .matches(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, 'Invalid image URL or file'),
    tags: Yup.string().required('Tag is required'),
  });