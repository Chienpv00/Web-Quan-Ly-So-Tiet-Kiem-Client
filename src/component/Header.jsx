import React from 'react';
import { NavLink } from 'react-router-dom';
import './styleHeader.scss';

import { Button } from 'react-bootstrap';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
const Header = ({ adminMode, userMode, managementMode }) => {
    return (
        <header className="">
            <Container className='flex'>
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
                            <NavLink className="textLink" to="">
                                DS Phiếu Gửi Tiền
                            </NavLink>
                        </li>
                        <li className="textLink">
                            <NavDropdown title="Báo Cáo">
                                <NavDropdown.Item>Action</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="textLink">
                            <NavDropdown title="Thay Đổi Quy Định">
                                <NavDropdown.Item>Action</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                    </ul>
                </nav>
                <div className="account textLink">
                </div>
            </Container>
        </header>
    );
};

export default Header;
