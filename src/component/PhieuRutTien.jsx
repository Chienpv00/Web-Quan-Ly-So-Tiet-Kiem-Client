import React, { useState } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';
import FormField from './FormField';
import dateFormat from 'dateformat';

import { CHECK_KHACH_HANG, CREATE_PHIEU_RUT_TIEN } from './query';
import Dspgt from './dspgt';
import { useNavigate } from 'react-router-dom';

const PhieuRutTien = () => {
    const [renderDs, setRenderDs] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [phieuRT, setPhieuRT] = useState();
    const [show, setShow] = useState(false);
    const [noti, setNoti] = useState(false);
   
    const [mutateFunc, { data1, loading1, error }] = useMutation(CREATE_PHIEU_RUT_TIEN);
    const navigate = useNavigate()
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
    });

    // lay data phieu rut tien
    const getPRT = (dataX) => {
        console.log('dataX: ', dataX.MaPhieuGoi);
        setPhieuRT(dataX);
    };

    // khi click button
    const handleClick = () => {
        setShow(true);
    };

    const handleClose = () => {setShow(false); setNoti(false)};

    const nowObj = new Date();
    const now = dateFormat(nowObj, 'yyyy/mm/d');


    
    return (
        <div>
            <h5>PHIẾU RÚT TIỀN</h5>
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
                <div style={renderDs ? { overflowY: 'auto', height: '207px' } : {}} className="scrollTable">
                    {renderDs && (
                        <Dspgt test={test} getPRT={getPRT} maKhachHang={data?.checkKhachHangExists?.KhachHang?.MaKhachHang} />
                    )}
                </div>
            </FormField>

            <FormField legend={'Tạo phiếu rút tiền: '} onSubmit={submitCreatePRT}>
                <Row>
                    <Col>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Mã Phiếu Gởi:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaPhieuGoi} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Loại tiết kiệm:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaLoaiTietKiem} disabled />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Lãi Suất:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaLoaiTietKiem} disabled />
                            </Col>
                            <Col className='d-flex align-items-center'>%</Col>
                        </Form.Group> */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Số tiền gởi:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoTienGoi} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VNĐ</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Ngày Gởi:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.NgayGoi} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">YYYY/MM/DD</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Số dư hiện tại:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoDu} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VNĐ</Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Mã khách hàng:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.MaKhachHang} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Tên khách hàng:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.TenKhachHang} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                CCCD/CMND:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.CMND} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Số điện thoại:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.SDT} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Địa chỉ:
                            </Form.Label>
                            <Col xs="7">
                                <Form.Control
                                    as="textarea"
                                    value={data?.checkKhachHangExists?.KhachHang?.DiaChi}
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="6">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Số tiền rút:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoDu} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VNĐ</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Số dư còn lại:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={0} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VNĐ</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Ngày Rút:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={now} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">YYYY/MM/DD</Col>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                        <Button variant="secondary" className="mb-3 mx-3 ">
                            Hủy
                        </Button>
                        <Button onClick={handleClick} className="mb-3">
                            Tạo phiếu rút
                        </Button>
                        <Modal backdrop= 'static' show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác nhận</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{noti ? <Alert variant='success'>Lập phiếu rút tiền thành công! </Alert>: <Alert style={{width: "100%"}} variant='light'>Xác nhận tạo phiếu rút tiền cho phiếu gởi tiền này?</Alert>}</Modal.Body>
                            <Modal.Footer>
                                <Button
                                disabled= {noti}
                                    onClick={() => {
                                        mutateFunc({
                                            variables: { maPhieuGoi: phieuRT?.MaPhieuGoi, ngayRut: now },
                                            onCompleted: () => {
                                                setNoti(true)
                                                setRenderDs()
                                               
                                            },
                                        });
                                    }}
                                >
                                   Tạo phiếu rút
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                >
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </FormField>
            <Button  ><a style={{color:'white', textDecoration: 'none'}} href="/home/phieu-rut-tien">Phiên làm việc mới</a></Button>
        </div>
    );
};

export default PhieuRutTien;
