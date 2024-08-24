// import { useFormik } from 'formik';
// yup


// const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       content: '',
//       tags: '',
//       metaTitle: '',
//       file: null,
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       description: Yup.string().required('Description is required'),
//       content: Yup.string().required('Content is required'),
//       tags: Yup.string(),
//       metaTitle: Yup.string(),
//       file: Yup.mixed().required('Cover image is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form values:', values);

//       formik.resetForm();
//     },
//   });


// const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         Formik.setFieldValue('file', reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       formik.setFieldValue('file', null);
//     }
//   };