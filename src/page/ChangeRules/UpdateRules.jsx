import React from 'react';
import { useState } from 'react';
import FormField from '../../component/FormField';
import TableUpdateRules from './TableUpdateRules';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_LOAI_TIET_KIEM_THEO_MA } from '../../graphql/queries';
import { UPDATE_RULES } from '../../graphql/mutations';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { Alert } from 'react-bootstrap';

const UpdateRules = ({ nav }) => {
    const [state, setState] = useState(false);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [showMainModal, setShowMainModal] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const [loadGetLTK] = useLazyQuery(GET_LOAI_TIET_KIEM_THEO_MA);
    const [loadUpdateLTK] = useMutation(UPDATE_RULES);

    const handleUpdate = (value) => {
        loadGetLTK({
            variables: { ma: value },
            onCompleted: (result) => {
                setValue('ma', result.getLoaitkWithma.MaLoaiTietKiem);
                setValue('ten', result.getLoaitkWithma.TenLoaiTietKiem);
                setValue('kyHan', result.getLoaitkWithma.KyHan);
                setValue('laiSuat', result.getLoaitkWithma.LaiSuatHienTai);
                const d = new Date(result.getLoaitkWithma.NgayApDung);
                setStartDate(d);
            },
        });
        setState(false);
        setShow(true);
    };

    const onHide = () => {
        setShow(false);
        setShowSuccess(false);
        setShowError(false);
        setShowMainModal(true);
    };

    const onSubmit = handleSubmit((value) => {

        if (Object.keys(errors).length === 0) {
            let date = dateFormat(startDate, 'yyyy-mm-dd');
            loadUpdateLTK({
                variables: { loaiTkInp: { ...value, ngayApDung: date, laiSuat: parseFloat(value.laiSuat) } },
                onCompleted: (value) => {
                    setState(true);
                    setShowMainModal(false);
                    value.updateLoaiTietKiem.success === true ? setShowSuccess(true) : setShowError(true);
                },
            });
        }
    });
    return (
        <div>
            <FormField legend={'Danh sách loại tiết kiệm:'}>
                <TableUpdateRules nav={nav} handleUpdate={handleUpdate} reFetch={state} />
                <Modal backdrop="static" animation show={show} onHide={onHide}>
                    <form onSubmit={onSubmit}>
                        <Modal.Header closeButton><Modal.Title>Chỉnh sửa loại tiết kiệm</Modal.Title></Modal.Header>
                        {showMainModal ? (
                            <>
                                {' '}
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Label>Mã</Form.Label>
                                        <Form.Control {...register('ma')} disabled />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tên</Form.Label>
                                        <Form.Control
                                            {...register('ten', { required: { value: true, message: 'required!' } })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Kỳ hạn</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('kyHan', { required: { value: true, message: 'required!' } })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Lãi suất</Form.Label>
                                        <Form.Control
                                            type="number"
                                            step={0.01}
                                            {...register('laiSuat', {
                                                required: { value: true, message: 'required!' },
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ngày áp dụng</Form.Label>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        onClick={() => {
                                            setShow(false);
                                        }}
                                        variant="secondary"
                                    >
                                        Hủy
                                    </Button>
                                    <Button type="submit">Sửa</Button>
                                </Modal.Footer>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                    </form>
                    {showSuccess && (
                        <Modal.Body>
                            <Alert variant="success">Chỉnh sửa thành công ✅</Alert>
                        </Modal.Body>
                    )}
                    {showError && (
                        <Modal.Body>
                            <Alert variant="danger">Chỉnh sửa thất bại ⚠️</Alert>
                        </Modal.Body>
                    )}
                </Modal>
            </FormField>
        </div>
    );
};

export default UpdateRules;
