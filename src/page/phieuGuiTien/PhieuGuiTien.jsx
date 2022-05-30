import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { Nav } from 'react-bootstrap';
import SearchCustomer from './SearchCustomer';
import CreateCus from './CreateCus';
import CreatePgt from './CreatePgt';

const PhieuGuiTien = () => {
    // khai bao hook form
    const {
        register,
        formState: { errors },
    } = useForm();

    // khai bao hook useState cho viec display notify for not find customer

    // khai bao mang usetate 3 phan tu trong sub nav
    const [nav, setNav] = useState([true, false, false]);
    const [data, setData] = useState()


    const RenderSearchCus = () => {
        setNav([true, false, false]);
    };

    const RenderCreateCus = () => {
        setNav([false, true, false]);
    };
   
    const callSetData = (value) => {
        setData(value)
    }
   
    return (
        <div className="phieu-gui-tien">
            <h5>PHIẾU GỞI TIỀN</h5>
            <Row>
                <Col sm="2" className="subNav">
                    <Nav className="flex-column">
                        <Nav.Item className={nav[0] ? 'subNavItem active' : 'subNavItem'} onClick={RenderSearchCus}>
                            <span>Tạo phiếu gởi tiền</span>
                        </Nav.Item>
                        <Nav.Item className={nav[1] ? 'subNavItem active' : 'subNavItem'} onClick={RenderCreateCus}>
                            <span>Tạo khách hàng mới</span>
                        </Nav.Item>
                        {/* <Nav.Item className={nav[2] ? 'subNavItem active' : 'subNavItem'} onClick={RenderCreatePGT}>
                            <span>Tạo phiếu gởi tiền</span>
                        </Nav.Item> */}
                    </Nav>
                </Col>
                <Col sm="10">
                    {nav[0] && (
                        <>
                        <SearchCustomer

                            RenderCreateCus={RenderCreateCus}
                            setNav={setNav}
                            callSetData={callSetData}
                        />
                        {nav[2]&&<CreatePgt dataCus={data}/>}
                        </>
                    )}

                    {nav[1] && (
                        <CreateCus
                            register={register}
                            errors={errors}
                           
                            
                        />
                    )}
                    
                </Col>
            </Row>
        </div>
    );
};

export default PhieuGuiTien;
