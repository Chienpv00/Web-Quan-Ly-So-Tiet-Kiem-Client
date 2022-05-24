import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styleHeader.scss';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header = ({ adminMode, userMode, managementMode }) => {
    const navigate = useNavigate();

    const handleBaoCao = (eventKey) => {
        if (eventKey === '1') navigate('bao-cao-doanh-so-hoat-dong-ngay');
        if (eventKey === '2') navigate('bao-cao-phieu-dong-mo-thang');
    };
    return (
        <header className="headerCpn">
            <Container className="flex align-items-center">
                <div className="logo">
                    <NavLink className={'textLink'} to="/home">
                        QUẢN LÝ SỔ TIẾT KIỆM
                    </NavLink>
                </div>
                <nav className="navPrimary">
                    <ul>
                        <li className="textLink">
                            <NavLink className="textLink" to="phieu-gui-tien">
                                Phiếu Gửi Tiền
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink className="textLink" to="phieu-rut-tien">
                                Phiếu Rút Tiền
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink className="textLink" to="danh-sach-phieu-gui-tien">
                                DS Phiếu Gửi Tiền
                            </NavLink>
                        </li>
                        <li className="textLink">
                            <NavDropdown title="Báo Cáo" bsPrefix="navDrop" onSelect={handleBaoCao}>
                                <NavDropdown.Item eventKey="1">Báo cáo doanh số hoạt động ngày</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2">Báo cáo phiếu đóng mở tháng</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="textLink">
                            <NavDropdown title="Thay Đổi Quy Định" bsPrefix="navDrop">
                                <NavDropdown.Item>Báo cáo phiếu đóng mở tháng</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                    </ul>
                </nav>
                <div className="account textLink"></div>
            </Container>
        </header>
    );
};

export default Header;
