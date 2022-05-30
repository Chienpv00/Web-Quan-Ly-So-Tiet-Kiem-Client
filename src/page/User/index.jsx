import { useState } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import './styles.scss';
import { MdLogout } from 'react-icons/md';
import FormField from '../../component/FormField';
import { useSelector, useDispatch } from 'react-redux';
import { success } from '../../futures/login/loginSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {
    //  useState for nav active
    const [nav, setNav] = useState([true, false]);

    // navigate from react router
    const navigate = useNavigate()
    // get user slice from redux in loginSlice
    const userData = useSelector((state) => state.login);
    console.log("🚀 ~ file: index.jsx ~ line 15 ~ User ~ userData", userData)

    // declare dispatch
    const dispatch = useDispatch();

    // handle active for employee information
    const RenderInfo = () => {
        setNav([true, false]);
    };

    // handle active for change password
    const RenderChangePW = () => {
        setNav([false, true]);
    };

    // handle when user want logout
    const handleLogout = () => {

        navigate('/')
        // set login slide
        dispatch(
            success({
                success: false,
                TenDangNhap: null,
                MaNhom: null,
                TenNhom: null,
                ChucNang: [
                    {
                        MaChucNang: null,
                        TenChucNang: null,
                        TenManHinhDuocLoad: null,
                    },
                ],
            })
        );

    console.log("after dispatch", userData)

    };

    return (
        <div>
            <div className="changeRules">
                <h5>THAY ĐỔI QUY ĐỊNH</h5>
                <Row>
                    <Col sm="2" className="subNav">
                        <Nav className="flex-column">
                            <Nav.Item className={nav[0] ? 'subNavItem active' : 'subNavItem'} onClick={RenderInfo}>
                                <span>Thông tin nhân viên</span>
                            </Nav.Item>
                            <Nav.Item className={nav[1] ? 'subNavItem active' : 'subNavItem'} onClick={RenderChangePW}>
                                <span>Đổi mật khẩu</span>
                            </Nav.Item>
                            <Nav.Item onClick={handleLogout} className="subNavItem logoutText">
                                <span>Đăng xuất</span> <MdLogout className="logoutIcon" />
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm="10">
                        {nav[0] && (
                            <>
                                <FormField legend={'Thông tin cá nhân:'}>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col className='fw-bold'>Tên đăng nhập:</Col>
                                                <Col>{userData?.TenDangNhap}</Col>
                                            </Row>
                                            <Row>
                                                <Col className='fw-bold'>Chức năng:</Col>
                                                <Col>
                                                    {' '}
                                                    {userData.ChucNang.map((value) => {
                                                        return <p key={value.MaChucNang}>{value.TenChucNang}</p>;
                                                    })}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className='fw-bold'>Nhóm người dùng:</Col>
                                                <Col>{userData.TenNhom}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormField>
                            </>
                        )}

                        {nav[1] && <></>}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default User;
