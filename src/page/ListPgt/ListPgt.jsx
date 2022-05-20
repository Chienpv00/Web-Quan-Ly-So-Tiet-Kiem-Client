import { useState } from 'react';
import './styles.scss';
import { Row } from 'react-bootstrap';
import FormField from '../../component/FormField';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { Col, Table } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_LOAI_TIET_KIEM } from './graphql';
import { Button } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import TablePGT from './TablePGT';

function ListPgt() {
    const { register, handleSubmit } = useForm();
    const [customerData, setCustomerData] = useState();
    const [state, setState] = useState(false);

    const { erorrs, data } = useQuery(GET_LOAI_TIET_KIEM);

    // hanle submit form Bo loc
    const onSubmit = handleSubmit((value) => {
        setCustomerData(value);
        setState(true)
    });

    // // handle click when user click button
    // const handleClick = () => {
    //     loadGetList({
    //         variables: { input: data },
    //         onCompleted: (value) => {
    //             setCustomerData(value);
    //             setState(true)
    //         },
    //     });
    // };
    return (
        <div className="dspgt">
            <h5>DANH SÁCH PHIẾU GỞI TIỀN</h5>
            <FormField legend={'Bộ lọc'} onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="2">
                        <Form.Label>Loại tiết kiệm:</Form.Label>
                        <Form.Select {...register('loaiTK')}>
                            <option value="-1">Tất cả</option>
                            {data?.getLoaitk.map((value, index) => {
                                return (
                                    <option key={index} value={value.MaLoaiTietKiem}>
                                        {value.TenLoaiTietKiem}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col sm="2">
                        <Form.Label>Trạng Thái</Form.Label>
                        <Form.Select {...register('status')}>
                            <option value="-1">Tất cả</option>
                            <option value="1">Chưa rút</option>
                            <option value="0">Đã rút</option>
                        </Form.Select>
                    </Col>

                    {/* <Col sm="2">
                        <Form.Label>Ngày</Form.Label>
                        <Form.Select {...register('day')}>
                            <option value="-1">Tất cả</option>
                            {new Array(31).fill({}).map((value, index) => {
                                return (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col> */}
                    <Col sm="2">
                        <Form.Label>Năm</Form.Label>
                        <Form.Select {...register('year')}>
                            <option value="-1">Tất cả</option>
                            {new Array(10).fill({ y: 2018 }).map((value, index) => {
                                return (
                                    <option key={index} value={value.y + index}>
                                        {value.y + index}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col sm="2">
                        <Form.Label>Tháng</Form.Label>
                        <Form.Select {...register('month')}>
                            <option value="-1">Tất cả</option>
                            {new Array(12).fill({}).map((value, index) => {
                                return (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>

                    <Col sm="2">
                        <Button className="btnSubmit" type="submit">
                            <BsFilter /> Tìm kiếm
                        </Button>
                    </Col>
                </Form.Group>
            </FormField>

{state && <TablePGT customerData={customerData}/>}
            
           
        </div>
    );
}

export default ListPgt;
