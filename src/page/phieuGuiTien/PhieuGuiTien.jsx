import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './styles.scss';
import FormField from '../../component/FormField';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavLink, Route, Routes } from 'react-router-dom';
import Inputbs from '../../component/Inputbs';
import { Modal } from 'react-bootstrap';
import { GET_KH_BY_CMND } from './graphql';
import { useLazyQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import SearchCustomer from './SearchCustomer';
import CreateCus from './CreateCus';
import CreatePgt from './CreatePgt';

const PhieuGuiTien = () => {
    // khai bao hook form
    const {
        register,
        handleSubmit,
        resetField,
        clearErrors,
        formState: { errors },
    } = useForm();

    // khai bao hook useState cho viec display notify for not find customer
    const [checkCustomer, setCheckCustomer] = useState(false);

    // khai bao mang usetate 3 phan tu trong sub nav
    const [nav, setNav] = useState([true, false, false]);

    // Khai bao useLazyQuery cho api truy van khach hang theo cmnd
    const [loadCheckKH, { data }] = useLazyQuery(GET_KH_BY_CMND);

    // khai bao useMutation cho viec tao khach hang
  

    // useState cho bang ket qua khach hang
    const [tableCus, setTableCus] = useState(false);

    // useState cho viec tao khach hang
    const [dataCreCus, setDataCreCus] = useState();

    const onSubmit = handleSubmit((result) => {
        console.log('🚀 ~ file: PhieuGuiTien.jsx ~ line 36 ~ onSubmit ~ result', result);
        loadCheckKH({
            variables: { cmnd: result.searchKH },
            onCompleted: (checkKHapi) => {
                console.log('🚀 ~ file: PhieuGuiTien.jsx ~ line 45 ~ loadCheckKH ~ checkKHapi', checkKHapi);
                if (checkKHapi.getKhachHangByCmnd === null) {
                    setCheckCustomer(true);
                    setTableCus(false);
                } else {
                    setTableCus(true);
                    setCheckCustomer(false);
                }
            },
        });
    });
    const RenderSearchCus = () => {
        setNav([true, false, false]);
    };

    const RenderCreateCus = () => {
        setNav([false, true, false]);
    };

    const RenderCreatePGT = () => {
        setNav([false, false, true]);
    };

   

   
    return (
        <div className="phieu-gui-tien">
            <h5>PHIẾU GỞI TIỀN</h5>
            <Row>
                <Col sm="2" className="subNav">
                    <Nav className="flex-column">
                        <Nav.Item className={nav[0] ? 'subNavItem active' : 'subNavItem'} onClick={RenderSearchCus}>
                            <span>Tìm kiếm khách hàng</span>
                        </Nav.Item>
                        <Nav.Item className={nav[1] ? 'subNavItem active' : 'subNavItem'} onClick={RenderCreateCus}>
                            <span>Tạo khách hàng mới</span>
                        </Nav.Item>
                        <Nav.Item className={nav[2] ? 'subNavItem active' : 'subNavItem'} onClick={RenderCreatePGT}>
                            <span>Tạo phiếu gởi tiền</span>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm="10">
                    {nav[0] && (
                        <SearchCustomer
                            onSubmit={onSubmit}
                            clearErrors={clearErrors}
                            register={register}
                            errors={errors}
                            tableCus={tableCus}
                            checkCustomer={checkCustomer}
                            RenderCreateCus={RenderCreateCus}
                            setNav={setNav}
                            data={data}
                        />
                    )}

                    {nav[1] && (
                        <CreateCus
                            register={register}
                            errors={errors}
                           
                            
                        />
                    )}
                    {nav[2] && <CreatePgt/>}
                </Col>
            </Row>
        </div>
    );
};

export default PhieuGuiTien;
