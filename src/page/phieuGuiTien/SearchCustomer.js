import React from 'react';
import FormField from '../../component/FormField';
import { Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { BsXCircle, BsPlusLg } from 'react-icons/bs';


const SearchCustomer = ({onSubmit, clearErrors, register, errors, tableCus, checkCustomer,setNav, RenderCreateCus, data}) => {
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
                                                    minLength: { value: 9, message: 'Bạn phải nhập tối thiểu 9 số' },
                                                })}
                                            />
                                        </Col>
                                        <Col sm="2">
                                            <Button type="submit">Tìm</Button>
                                        </Col>
                                    </Form.Group>
                                    {errors?.searchKH?.message}
                                    {errors?.searchKH?.message?.required}
                                </Col>
                                <Col sm="4">
                                    <Alert bsPrefix="alert" variant={'danger'} show={checkCustomer}>
                                        Không tìm thấy khách hàng!{' '}
                                        <span onClick={RenderCreateCus} className="mx-4">
                                            {' '}
                                            <span
                                                onClick={() => {
                                                    setNav([false, true, false]);
                                                }}
                                            >
                                                {' '}
                                                <Button>
                                                    Tạo khách hàng mới <BsPlusLg />
                                                </Button>
                                            </span>
                                        </span>
                                    </Alert>
                                </Col>
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

                            {tableCus && (
                                <Button
                                    onClick={() => {
                                        setNav([false, false, true]);
                                    }}
                                    className="mb-2"
                                >
                                    Tạo phiếu gởi tiền cho khách hàng
                                </Button>
                            )}
                        </FormField>
    );
}

export default SearchCustomer;
