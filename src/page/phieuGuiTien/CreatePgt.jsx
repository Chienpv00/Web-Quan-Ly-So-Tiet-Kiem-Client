import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../../component/FormField';
const CreatePgt = () => {

    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit
    return (
        <FormField legend={'Tạo phiếu gởi tiền:'} onSubmit={onSubmit}>
            <Form.Group as={Row}>
                
            </Form.Group>

        </FormField>
    );
}

export default CreatePgt;
