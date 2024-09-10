import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config';

const Formulario = () => {

    const initialValues = {
        name: '',
        description: '',
        stock: '',
        price: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(20, 'Nombre demasiado largo')
            .required('Campo obligatorio'),
        description: Yup.string()
            .min(10, 'Descripción demasiada corta')
            .max(250, 'Descripción demasiada larga')
            .required('Campo obligatorio'),
        stock: Yup.number()
            .required('Campo obligatorio'),
        price: Yup.number()
            .required('Campo obligatorio')
    })
    return (
        <div className='container'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
                    axiosInstance.post('/', values)
                    .then(r => {
                        if (r.status == 201) {
                            console.log(r)
                            setSubmitting(false)
                        }else{
                            throw new Error(`[${r.status}]error en la solicitud`)
                        }
                    })
                    .catch( err => console.log(err))
                }}
            >
                {
                    ({ values, isSubmitting, errors, touched }) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='name'>Nombre del producto</label>
                                <Field id='name' type='text' placeholder='Nombre' name='name' 
                                className='form-control field-input'/>
                                {
                                    errors.name && touched.name && (
                                        <ErrorMessage name='name' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='description'>Descripción</label>
                                <Field id='description' type='text' placeholder='descripción' name='description' 
                                className='form-control field-input'/>
                                {
                                    errors.description && touched.description && (
                                        <ErrorMessage name='description' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='stock'>Stock</label>
                                <Field id='stock' type='number' placeholder='20' name='stock' 
                                className='form-control field-input'/>
                                {
                                    errors.stock && touched.stock && (
                                        <ErrorMessage name='stock' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='price'>Precio</label>
                                <Field id='price' type='number' placeholder='15' name='price' 
                                className='form-control field-input'/>
                                {
                                    errors.price && touched.price && (
                                        <ErrorMessage name='price' component='div'></ErrorMessage>
                                    )
                                }
                            </FormBs.Group>
                            <Button className='btn btn-primary' type="submit">Ingresar producto</Button>
                            {
                                isSubmitting ? (<p>Producto enviado</p>) : null
                            }
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Formulario