import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import FormField from '../../component/FormField';

import {GET_LOAI_TIET_KIEM} from '../../graphql/queries'
import { CREATE_PGT } from '../../graphql/mutations';

const CreatePgt = ({ dataCus }) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        formState,
        watch,
        getValues,
        formState: { errors },
        resetField,
    } = useForm();

    // Query for get loai tk
    const { data, loading } = useQuery(GET_LOAI_TIET_KIEM);

    // mutation for create pgt
    const [callCrePgt] = useMutation(CREATE_PGT);

    const [state, setstate] = useState(true);

    const [showModalPgt, setShowModalPgt] = useState(false);

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModalButton, setShowModalButton] = useState(true);
    const [sizeModal, setSizeModal] = useState('');

    const onSubmit = handleSubmit((result) => {
        console.log(result);

        if (errors.soTienGui === undefined) {
            setShowModalPgt(true);
        }
    });

    const callMutation = () => {

        callCrePgt({
            variables: {
                maLoaiTietKiem: data.getLoaitk[parseInt(getValues('loaitk'))].MaLoaiTietKiem,
                soTienGoi: Math.abs(parseInt(getValues('soTienGui'))),
                maKhachHang: dataCus.getKhachHangByCmnd.MaKhachHang,
            },
            onCompleted: (data) => {
                if (data.createPhieuGuiTien.code !== 200) {
                    console.log('Server Error! with message: ', data.createPhieuGuiTien.message);
                    setShowModal2(true);
                    setShowModalButton(false);
                }
                if (data.createPhieuGuiTien.success === false) {
                    showModal2(true);
                    setShowModalButton(false);
                }
                setSizeModal('lg')
                setShowModalButton(false);
                setstate(data.createPhieuGuiTien);
                setShowModal1(true);
            },
        });
    };

    return (
        <FormField legend={'Tạo phiếu gởi tiền:'} onSubmit={onSubmit}>
            <Form.Group as={Row}>
                <Col sm="6">
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>Loại tiết kiệm:</Form.Label>
                        </Col>
                        <Col sm="6">
                            {loading ? (
                                <Spinner variant="success" />
                            ) : (
                                <Form.Select {...register('loaitk')}>
                                    {data.getLoaitk.map((value, index) => {
                                        if(value.TrangThai===true)
                                        return (
                                            <option key={index} value={index}>
                                                {value.TenLoaiTietKiem}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            )}
                        </Col>

                        <Col></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>Lãi suất:</Form.Label>
                        </Col>
                        <Col sm="6">
                            {console.log(watch('loaitk'))}
                            <Form.Control
                                disabled
                                value={
                                    watch('loaitk') === undefined
                                        ? data?.getLoaitk[0]?.LaiSuatHienTai
                                        : data?.getLoaitk[watch('loaitk')]?.LaiSuatHienTai
                                }
                            />
                        </Col>

                        <Col className="d-flex align-items-center">%</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>Số tiền gởi:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="number"
                                {...register('soTienGui', {
                                    required: { value: true, message: 'Trường này là bắt buộc' },
                                    pattern: {
                                        value: /[0-9]/,
                                        message: 'Vui lòng nhập vào chữ số!',
                                    },
                                })}
                            />
                            <p style={{ color: 'red' }} className="mt-2">
                                {errors?.soTienGui?.message}
                            </p>
                        </Col>

                        <Col className="d-flex align-items-center">VNĐ</Col>
                    </Row>
                </Col>

                <Col>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            Mã khách hàng:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.MaKhachHang} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            Tên khách hàng:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.TenKhachHang} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            CCCD/CMND:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.CMND} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            Số điện thoại:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.SDT} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            Địa chỉ:
                        </Form.Label>
                        <Col xs="7">
                            <Form.Control as="textarea" value={dataCus?.getKhachHangByCmnd?.DiaChi} disabled />
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>

            <Button
                onClick={() => {
                    setShowModalButton(true);
                }}
                type="submit"
                className="mb-3"
            >
                Tạo phiếu gởi tiền
            </Button>
            <Modal
                show={showModalPgt}
                onHide={() => {
                    setShowModalPgt(false);
                    setShowModal1(false);
                    setShowModal2(false);
                    resetField('soTienGui');
                    setSizeModal('')
                }}
                dialogClassName="modal-90w"
                size={sizeModal}
            >
                <Modal.Header closeButton>Bạn có xác nhận tạo phiếu gửi tiền này không?</Modal.Header>
                <Modal.Body>
                    {showModalButton && (
                        <div className="d-flex justify-content-end">
                            <Button className="mx-5" onClick={callMutation} variant={'primary'}>
                                Xác nhận
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowModalPgt(false);
                                }}
                                variant={'secondary'}
                            >
                                Hủy
                            </Button>
                        </div>
                    )}
                    {showModal1 && (
                        <div className="d-flex justify-content-center align-items-center flex-column ">
                            <Alert className="mb-2 mt-2 text-center fs-4" variant="success">
                                🤑 Tạo phiếu gửi tiền thành công!!!
                            </Alert>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Khách hàng</th>
                                        <th>CCCD/CMND</th>
                                        <th>Mã phiếu gởi</th>
                                        <th>Số tiền gởi</th>
                                        <th>Ngày đáo hạn kế tiếp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{state.PhieuGoiTien.MaKhachHang.TenKhachHang}</td>
                                        <td>{state.PhieuGoiTien.MaKhachHang.CMND}</td>
                                        <td>{state.PhieuGoiTien.MaPhieuGoi}</td>
                                        <td>{state.PhieuGoiTien.SoTienGoi}</td>
                                        <td>{state.PhieuGoiTien?.NgayDaoHanKeTiep}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Mã loại tiết kiệm</th>
                                        <th>Tên loại tiết kiệm</th>
                                        <th>Lãi suất áp dụng</th>
                                        <th>Kỳ hạn</th>
                                        <th>Ngày áp dụng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{state.PhieuGoiTien.MaLoaiTietKiem.MaLoaiTietKiem}</td>
                                        <td>{state.PhieuGoiTien.MaLoaiTietKiem.TenLoaiTietKiem}</td>
                                        <td>{state.PhieuGoiTien.MaLoaiTietKiem.LaiSuatHienTai}</td>
                                        <td>{state.PhieuGoiTien.MaLoaiTietKiem.KyHan}</td>
                                        <td>{state.PhieuGoiTien.MaLoaiTietKiem.NgayApDung}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )}
                    {showModal2 && (
                        <div>
                            <Alert variant="danger">💀 Tạo phiếu gởi tiền thất bại</Alert>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </FormField>
    );
};

export default CreatePgt;
