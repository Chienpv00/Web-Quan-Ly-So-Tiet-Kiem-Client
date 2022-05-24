import React from 'react';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import FormField from '../../component/FormField';
import TableUpdateRules from './TableUpdateRules';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const UpdateRules = ({nav}) => {
    const [state, setState] = useState(false);
    const [show, setShow] = useState(true)
    const handleUpdate = (value) => { 
    console.log("🚀 ~ file: UpdateRules.jsx ~ line 12 ~ handleUpdate ~ value", value)
        setState(false);
        setShow(true)
        // loadDeleteRules({
        //     variables: { ma: value },
        //     onCompleted: () => {
        //         setState(true);
        //     },
        // });
    };

    const onHide = () => {
        setShow(false)
    }
    return (
        <div>
             <FormField legend={'Danh sách loại tiết kiệm:'}>
                <TableUpdateRules nav={nav} handleUpdate={handleUpdate} reFetch={state} />
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Modal.Body>
            </Modal>
            </FormField>
        </div>
    );
}

export default UpdateRules;
