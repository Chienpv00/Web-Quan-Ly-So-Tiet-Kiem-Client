import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../../../component/FormField';

import {GET_LOAI_TIET_KIEM} from '../../../graphql/queries'
import { CREATE_PGT } from '../../../graphql/mutations';

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
        <FormField legend={'T???o phi???u g???i ti???n:'} onSubmit={onSubmit}>
            <Form.Group as={Row}>
                <Col sm="6">
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>Lo???i ti???t ki???m:</Form.Label>
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
                            <Form.Label>L??i su???t:</Form.Label>
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
                            <Form.Label>S??? ti???n g???i:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="number"
                                {...register('soTienGui', {
                                    required: { value: true, message: 'Tr?????ng n??y l?? b???t bu???c' },
                                    pattern: {
                                        value: /[0-9]/,
                                        message: 'Vui l??ng nh???p v??o ch??? s???!',
                                    },
                                    min: {
                                        value: 1000000,
                                        message: 'S??? ti???n g???i t???i thi???u l?? 1.000.000 VN??'
                                    }
                                })}
                            />
                            <p style={{ color: 'red' }} className="mt-2">
                                {errors?.soTienGui?.message}
                            </p>
                        </Col>

                        <Col className="d-flex align-items-center">VN??</Col>
                    </Row>
                </Col>

                <Col>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            M?? kh??ch h??ng:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.MaKhachHang} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            T??n kh??ch h??ng:
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
                            S??? ??i???n tho???i:
                        </Form.Label>
                        <Col xs="4">
                            <Form.Control value={dataCus?.getKhachHangByCmnd?.SDT} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs="4">
                            ?????a ch???:
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
                T???o phi???u g???i ti???n
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
                <Modal.Header closeButton>B???n c?? x??c nh???n t???o phi???u g???i ti???n n??y kh??ng?</Modal.Header>
                <Modal.Body>
                    {showModalButton && (
                        <div className="d-flex justify-content-end">
                            <Button className="mx-5" onClick={callMutation} variant={'primary'}>
                                X??c nh???n
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowModalPgt(false);
                                }}
                                variant={'secondary'}
                            >
                                H???y
                            </Button>
                        </div>
                    )}
                    {showModal1 && (
                        <div className="d-flex justify-content-center align-items-center flex-column ">
                            <Alert className="mb-2 mt-2 text-center fs-4" variant="success">
                                ???? T???o phi???u g???i ti???n th??nh c??ng!!!
                            </Alert>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Kh??ch h??ng</th>
                                        <th>CCCD/CMND</th>
                                        <th>M?? phi???u g???i</th>
                                        <th>S??? ti???n g???i</th>
                                        <th>Ng??y ????o h???n k??? ti???p</th>
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
                                        <th>M?? lo???i ti???t ki???m</th>
                                        <th>T??n lo???i ti???t ki???m</th>
                                        <th>L??i su???t ??p d???ng</th>
                                        <th>K??? h???n</th>
                                        <th>Ng??y ??p d???ng</th>
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
                            <Alert variant="danger">???? T???o phi???u g???i ti???n th???t b???i</Alert>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </FormField>
    );
};

export default CreatePgt;
