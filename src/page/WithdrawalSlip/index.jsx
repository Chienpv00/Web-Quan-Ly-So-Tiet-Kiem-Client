import React, { useState } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';
import dateFormat from 'dateformat';
import FormField from '../../component/FormField'

import { CREATE_PHIEU_RUT_TIEN } from '../../graphql/mutations';
import { CHECK_KHACH_HANG } from '../../graphql/queries';
import ListWithdrawalSlip from '../../component/ListWithdrawalSlip';
import { useNavigate } from 'react-router-dom';


const PhieuRutTien = () => {

    const [renderDs, setRenderDs] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [phieuRT, setPhieuRT] = useState();
    const [show, setShow] = useState(false);
    const [noti, setNoti] = useState(false);
   
    const [mutateFunc, { data1, loading1, error }] = useMutation(CREATE_PHIEU_RUT_TIEN);
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
            <h5>PHI???U R??T TI???N</h5>
            <FormField legend={'T??m ki???m phi???u g???i ti???n:'} onSubmit={onSubmit}>
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
                                <Button type="submit">T??m</Button>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        {alertState && (
                            <Alert className="alert" variant="danger">
                                Kh??ng t??m th???y kh??ch h??ng trong CSDL !!!
                            </Alert>
                        )}
                    </Col>
                </Row>
                <div style={renderDs ? { overflowY: 'auto', height: '207px' } : {}} className="scrollTable">
                    {renderDs && (
                        <ListWithdrawalSlip getPRT={getPRT} maKhachHang={data?.checkKhachHangExists?.KhachHang?.MaKhachHang} />
                    )}
                </div>
            </FormField>

            <FormField legend={'T???o phi???u r??t ti???n: '} onSubmit={submitCreatePRT}>
                <Row>
                    <Col>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                M?? Phi???u G???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaPhieuGoi} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Lo???i ti???t ki???m:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaLoaiTietKiem} disabled />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                L??i Su???t:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.MaLoaiTietKiem} disabled />
                            </Col>
                            <Col className='d-flex align-items-center'>%</Col>
                        </Form.Group> */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                S??? ti???n g???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoTienGoi} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VN??</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Ng??y G???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.NgayGoi} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">YYYY/MM/DD</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                S??? d?? hi???n t???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoDu} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VN??</Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                M?? kh??ch h??ng:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.MaKhachHang} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                T??n kh??ch h??ng:
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
                                S??? ??i???n tho???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={data?.checkKhachHangExists?.KhachHang?.SDT} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                ?????a ch???:
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
                                S??? ti???n r??t:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={phieuRT?.SoDu} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VN??</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                S??? d?? c??n l???i:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={0} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">VN??</Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs="4">
                                Ng??y R??t:
                            </Form.Label>
                            <Col xs="4">
                                <Form.Control value={now} disabled />
                            </Col>
                            <Col className="d-flex align-items-center">YYYY/MM/DD</Col>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                        <Button variant="secondary" className="mb-3 mx-3 ">
                            H???y
                        </Button>
                        <Button onClick={handleClick} className="mb-3">
                            T???o phi???u r??t
                        </Button>
                        <Modal backdrop= 'static' show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>X??c nh???n</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='d-flex text-center justify-content-center'>{noti ? <Alert variant='success'>L???p phi???u r??t ti???n th??nh c??ng! </Alert>: <Alert style={{width: "100%"}} variant='light'>X??c nh???n t???o phi???u r??t ti???n cho phi???u g???i ti???n n??y?</Alert>}</Modal.Body>
                            <Modal.Footer>
                                {!noti && <Button
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
                                   T???o phi???u r??t
                                </Button>}
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                >
                                    ????ng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </FormField>
            <Button  ><a style={{color:'white', textDecoration: 'none'}} href="/home/phieu-rut-tien">Phi??n l??m vi???c m???i</a></Button>
        </div>
    );
};

export default PhieuRutTien;
