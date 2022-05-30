import { useState } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import './styles.scss';
import FormField from '../../component/FormField';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat, { masks } from 'dateformat';
import { ADD_RULES } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

const AddRules = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm();
    const [submitMutation, { data, loading, error, reset }] = useMutation(ADD_RULES);
    const onSubmit = handleSubmit((value) => {
        const ngayApDung = dateFormat(startDate, 'yyyy-mm-dd');

        if (parseFloat(value.kyHan) < 0 || parseFloat(value.laiSuat) < 0) {
            setShowFail(true);
        } else {
            const loaiTKInp = {
                ten: value.ten,
                kyHan: parseFloat(value.kyHan),
                laiSuat: parseFloat(value.laiSuat) / 100.0,
                ngayApDung,
            };
            console.log("🚀 ~ file: AddRules.jsx ~ line 37 ~ onSubmit ~ loaiTKInp", loaiTKInp)

            submitMutation({
                variables: { loaiTkInp: loaiTKInp },
                onCompleted: () => {
                    setShow(true);
                },
            });
        }
    });

    const [show, setShow] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const [startDate, setStartDate] = useState(new Date());

    const handleClose = () => {
        setShow(false);
        reset();
        resetField('ten');
        resetField('kyHan');
        resetField('laiSuat');
    };
    const handleCloseFail = () => {
        setShowFail(false);
        reset();
    };

    return (
        <FormField legend={'Nhập dữ liệu:'} onSubmit={onSubmit}>
            <Row>
                <Col>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as={Col} sm="2">
                            Tên:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                {...register('ten', { required: { value: true, message: 'Trường này là bắt buộc' } })}
                            />
                        </Col>
                        <Col sm="3"></Col>
                        <Col className="text-danger mt-2 mx-5">{errors?.ten?.message}</Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label as={Col} sm="2">
                            Kỳ hạn:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                type="number"
                                {...register('kyHan', {
                                    required: { value: true, message: 'Trường này là bắt buộc' },
                                    pattern: { value: /[0-9]/, message: 'Sai định dạng' },
                                    min: {value: 0, message: 'Sai định dạng!'}
                                })}
                            />
                        </Col>
                        <Col sm="3">
                            <i>Tháng</i>
                        </Col>
                        <Col className="text-danger mt-2 mx-5">{errors?.kyHan?.message}</Col>
                    </Form.Group>
                </Col>
                <Col className="mb-3">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as={Col} sm="3">
                            Lãi suất:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                {...register('laiSuat', {
                                    required: { value: true, message: 'Trường này là bắt buộc' },
                                    pattern: { value: /[0-9]/, message: 'Sai định dạng' },
                                    min: {value: 0, message: 'Sai định dạng!'}
                                })}
                            />
                        </Col>
                        <Col sm="2">%</Col>
                        <Col className="text-danger mt-2 mx-5">{errors?.laiSuat?.message}</Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label as={Col} sm="3">
                            Ngày áp dụng:
                        </Form.Label>
                        <Col sm="7">
                            <DatePicker
                                className="datePicker"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Col>
                        <Col sm="3"></Col>
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="mb-3">
                Tạo
            </Button>
            {show && (
                <Modal backdrop="static" show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Alert variant="success">Thao tác thành công !!!</Alert>
                    </Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Kỳ hạn</th>
                                <th>Lãi suất</th>
                                <th>Ngày áp dụng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.addLoaiTietKiem.LoaiTietKiem.MaLoaiTietKiem}</td>
                                <td>{data?.addLoaiTietKiem.LoaiTietKiem.TenLoaiTietKiem}</td>
                                <td>{data?.addLoaiTietKiem.LoaiTietKiem.KyHan}</td>
                                <td>{data?.addLoaiTietKiem.LoaiTietKiem.LaiSuatHienTai}</td>
                                <td>{data?.addLoaiTietKiem.LoaiTietKiem.NgayApDung}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal>
            )}

            {showFail && (
                <Modal backdrop="static" show={showFail} onHide={handleCloseFail}>
                    <Modal.Header closeButton><Modal.Title >Thông báo</Modal.Title></Modal.Header>
                    <Modal.Body className='text-center d-flex justify-content-center'>
                        <Alert variant="danger">Thao tác thất bại, sai định dạng!</Alert>
                    </Modal.Body>
                </Modal>
            )}
        </FormField>
    );
};

export default AddRules;
