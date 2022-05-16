import {useState} from 'react';
import FormField from '../../component/FormField';
import { Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import { GET_KH_BY_CMND } from './graphql';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';

const SearchCustomer = ({ setNav, RenderCreateCus, callSetData }) => {
    const {
        register,
        handleSubmit,
        resetField,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [loadCheckKH, { data }] = useLazyQuery(GET_KH_BY_CMND);

    const [checkCustomer, setCheckCustomer] = useState(false);
    const [tableCus, setTableCus] = useState(false);



    const onSubmit = handleSubmit((result) => {
        console.log('🚀 ~ file: PhieuGuiTien.jsx ~ line 36 ~ onSubmit ~ result', result);
        loadCheckKH({
            variables: { cmnd: result.searchKH },
            onCompleted: (checkKHapi) => {
                console.log('🚀 ~ file: PhieuGuiTien.jsx ~ line 45 ~ loadCheckKH ~ checkKHapi', checkKHapi);
                if (checkKHapi.getKhachHangByCmnd === null) {
                    setCheckCustomer(true);
                    setTableCus(false);
                    setNav([true, false, false]);
                } else {
                    setTableCus(true);
                    setCheckCustomer(false);
                    setNav([true, false, true]);
                    callSetData(checkKHapi)
                }
            },
        });
    });
    return (
        <FormField legend={'Tìm kiếm khách hàng: '} onSubmit={onSubmit}>
            <Row>
                <Col sm="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            CCCD/CMND:
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                onKeyDown={() => {
                                    clearErrors('searchKH');
                                }}
                                type="number"
                                {...register('searchKH', {
                                    required: { value: true, message: 'Vui lòng nhập số CCCD/CMND' },
                                    minLength: { value: 8, message: 'Bạn phải nhập tối thiểu 8 số' },
                                })}
                            />
                        </Col>
                        <Col sm="2">
                            <Button type="submit">Tìm</Button>
                        </Col>
                    </Form.Group>
                    <span style={{ color: 'red' }}>
                        {errors?.searchKH?.message}
                        {errors?.searchKH?.message?.required}
                    </span>
                </Col>
                <Col sm="4">
                    <Alert bsPrefix="alert" variant={'danger'} show={checkCustomer}>
                        Không tìm thấy khách hàng!{' '}
                    </Alert>
                </Col>
            </Row>
            <Row>
                {checkCustomer && (
                    <span onClick={RenderCreateCus} className="mb-2">
                        <span
                            onClick={() => {
                                setNav([false, true, false]);
                            }}
                        >
                            <Button>
                                Tạo khách hàng mới <BsPlusLg />
                            </Button>
                        </span>
                    </span>
                )}
            </Row>
            <Row>
                {tableCus && (
                    <Table className="mt-3" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Mã khách hàng</th>
                                <th>Tên khách hàng</th>
                                <th>CMND/CCCD</th>
                                <th>SDT</th>
                                <th>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.getKhachHangByCmnd?.MaKhachHang}</td>
                                <td>{data?.getKhachHangByCmnd?.TenKhachHang}</td>
                                <td>{data?.getKhachHangByCmnd?.CMND}</td>
                                <td>{data?.getKhachHangByCmnd?.SDT}</td>
                                <td>{data?.getKhachHangByCmnd?.DiaChi}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </Row>

            {/* {tableCus && (
                                <Button
                                    onClick={() => {
                                        setNav([false, false, true]);
                                    }}
                                    className="mb-2"
                                >
                                    Tạo phiếu gởi tiền cho khách hàng
                                </Button>
                            )} */}
        </FormField>
    );
};

export default SearchCustomer;
