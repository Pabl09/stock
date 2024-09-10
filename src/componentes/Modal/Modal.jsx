import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' ;
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';
import { axiosInstance } from '../../services/axios.config';

const Modal = (props) => {

    const { items, dispatch } = useContext(ItemsContext)

    const initialCredentials = {
        name: props.item.name || '',
        description: props.item.description || '',
        stock: props.item.stock || '',
        price: props.item.price || ''
    }

    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('campo obligatorio'),
        description: Yup.string().min(10, 'descripcion demasiado corta').max(100, 'desciprcion demasiado largo').required('campo obligatorio'),
        stock: Yup.number().required('campo obligatorio'),
        price: Yup.number().required('campo obligatorio')
    })

    return (
        <ModalBs
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Modal heading
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <Formik
                    initialValues={initialCredentials}
                    validationSchema={formSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        // same shape as initial values
                        console.log(values);
                        //await props.onSubmit(props.item.id, values)
                        axiosInstance.put(`/${props.item.id}`, values)
                            .then(r => {
                                if (r.status === 200) {
                                    const itemsUpload = items.map(item => {
                                        if (item.id === r.data.id) {
                                            return r.data
                                        }
                                        return item
                                    })
                                    dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload })
                                    setSubmitting(false)

                                } else {
                                    throw new Error(`[ERROR ${r.status}] Error en la solicitud`)
                                }

                            })
                            .catch(err => console.log(err))
                        props.onHide()
                    }}
                >
                    {({ values, errors, touched, isSubmitting, handleChange }) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='name'> Nombre del producto </label>
                                <Field id='name' type='text' placeholder='Nombre' name='name' className='form-control field-input' onChange={handleChange} />
                                {
                                    errors.name && touched.name && (
                                        <ErrorMessage name='name' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='description'> descripcion  </label>
                                <Field id='description' type='text' placeholder='describe el producto' name='description' className='form-control field-input' onChange={handleChange} />
                                {
                                    errors.description && touched.description && (
                                        <ErrorMessage name='description' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='stock'> stock </label>
                                <Field id='stock' type='number' placeholder='5' name='stock' className='form-control field-input' onChange={handleChange} />
                                {
                                    errors.stock && touched.stock && (
                                        <ErrorMessage name='stock' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='price'> precio </label>
                                <Field id='price' type='number' placeholder='8000' name='price' className='form-control field-input' onChange={handleChange} />
                                {
                                    errors.price && touched.price && (
                                        <ErrorMessage name='price' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>

                            <Button className='btn btn-primary' type="submit">Cargar producto</Button>
                            {
                                isSubmitting ? (<p>  Enviando producto </p>) : null
                            }
                        </Form>
                    )
                    }

                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Close</Button>
            </ModalBs.Footer>
        </ModalBs>
    )
}

export default Modal