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
                setValue('trangThai', result.getLoaitkWithma.TrangThai);

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
            if (parseFloat(value.kyHan) < 0 || parseFloat(value.laiSuat) < 0) {
                setShowError(true);
            } else {
                setShowError(false)
                let date = dateFormat(startDate, 'yyyy-mm-dd');
                console.log(value);
                console.log(date);
                loadUpdateLTK({
                    variables: { loaiTkInp: { ...value, ngayApDung: date, laiSuat: parseFloat(value.laiSuat), kyHan:parseFloat(value.kyHan) } },
                    onCompleted: (value) => {
                        setState(true);
                        setShowMainModal(false);
                        value.updateLoaiTietKiem.success === true ? setShowSuccess(true) : setShowError(true);
                    },
                });
            }
        }
    });
    return (
        <div>
            <FormField legend={'Danh s??ch lo???i ti???t ki???m:'}>
                <TableUpdateRules nav={nav} handleUpdate={handleUpdate} reFetch={state} />
                <Modal backdrop="static" animation show={show} onHide={onHide}>
                    <form onSubmit={onSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ch???nh s???a lo???i ti???t ki???m</Modal.Title>
                        </Modal.Header>
                        {showMainModal ? (
                            <>
                                {' '}
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Label>M??</Form.Label>
                                        <Form.Control {...register('ma')} disabled />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>T??n</Form.Label>
                                        <Form.Control
                                            {...register('ten', { required: { value: true, message: 'required!' } })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>K??? h???n</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('kyHan', { required: { value: true, message: 'required!' } })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>L??i su???t</Form.Label>
                                        <Form.Control
                                            type="number"
                                            step={0.01}
                                            {...register('laiSuat', {
                                                required: { value: true, message: 'required!' },
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Ng??y ??p d???ng</Form.Label>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tr???ng Th??i</Form.Label>
                                        <Form.Select {...register('trangThai')}>
                                            <option value={'true'}>True</option>
                                            <option value={'false'}>False</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        onClick={() => {
                                            setShow(false);
                                        }}
                                        variant="secondary"
                                    >
                                        H???y
                                    </Button>
                                    <Button type="submit">S???a</Button>
                                </Modal.Footer>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                    </form>
                    {showSuccess && (
                        <Modal.Body className='d-flex justify-content-center text-center'>
                            <Alert variant="success">Ch???nh s???a th??nh c??ng ???</Alert>
                        </Modal.Body>
                    )}
                    {showError && (
                        <Modal.Body className='d-flex justify-content-center text-center'>
                            <Alert variant="danger">Ch???nh s???a th???t b???i ??????</Alert>
                        </Modal.Body>
                    )}
                </Modal>
            </FormField>
        </div>
    );
};

export default UpdateRules;
