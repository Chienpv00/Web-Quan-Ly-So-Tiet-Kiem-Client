import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import FormField from './FormField';

import { CHECK_KHACH_HANG } from './query';
import Dspgt from './dspgt';

const PhieuRutTien = () => {
    const [renderDs, setRenderDs] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        resetField,
    } = useForm();

    // call api with useLazyQuery
    const [loadCheckKH, { loading, called, data }] = useLazyQuery(CHECK_KHACH_HANG);

    const onSubmit = handleSubmit((result) => {
        console.log(result);
        loadCheckKH({
            variables: { cmnd: result.findPgt },
            onCompleted: (data) => {
                if (data.checkKhachHangExists.exists === false) {
                    setAlertState(true);
                }
                setRenderDs(data.checkKhachHangExists.exists);
            },
        });
        // resetField('findPgt')
    });

    // tao phieu rut tien
    const submitCreatePRT = handleSubmit((result) => { 
        console.log(result);
     })

    return (
        <div>
            <h5>PHIẾU GỞI TIỀN</h5>
            <FormField legend={'Tìm kiếm phiếu gởi tiền:'} onSubmit={onSubmit}>
                <Row>
                    <Col sm="4">
                        <Form.Group as={Row} className="mb-3 f" controlId="formPlaintextEmail">
                            <Form.Label column sm="4" className="mr-3">
                                CCCD/CMND:
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control
                                    type="number"
                                    onKeyDown={() => {
                                        setAlertState(false);
                                    }}
                                    {...register('findPgt', {})}
                                />
                            </Col>
                            <Col sm="2">
                                <Button type="submit">Tìm</Button>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        {alertState && (
                            <Alert className="alert" variant="danger">
                                Không tìm thấy khách hàng trong CSDL !!!
                            </Alert>
                        )}
                    </Col>
                </Row>
                {renderDs && <Dspgt maKhachHang={data.checkKhachHangExists?.KhachHang?.MaKhachHang}/>}
            </FormField>

            <FormField legend={'Tạo phiếu rút tiền: '} onSubmit={submitCreatePRT}>

            </FormField>
        </div>
    );
};

export default PhieuRutTien;
