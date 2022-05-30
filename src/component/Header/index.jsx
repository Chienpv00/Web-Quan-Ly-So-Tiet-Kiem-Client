import {useState} from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
import { Container, NavDropdown } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

const Header = ({ adminMode, userMode, managementMode }) => {
console.log("🚀 ~ file: index.jsx ~ line 8 ~ Header ~ managementMode", managementMode)
console.log("🚀 ~ file: index.jsx ~ line 8 ~ Header ~ userMode", userMode)
console.log("🚀 ~ file: index.jsx ~ line 8 ~ Header ~ adminMode", adminMode)
    const navigate = useNavigate();
    const location  = useLocation()
    const [state] = useState({
        nav1: 'textLink',
        nav2: 'textLink',
        nav3: 'textLink',
        nav4: 'textLink',
        nav5: 'textLink',
    });

    

    const handleBaoCao = (eventKey) => {
        if (eventKey === '1') navigate('bao-cao-doanh-so-hoat-dong-ngay');
        if (eventKey === '2') navigate('bao-cao-phieu-dong-mo-thang');
    };

    const handleClick = (event) => {
        console.log(event.target.value);
    };

    const handleStyle = ({ isActive }) => {
        return isActive ? { borderBottom: '3.2px solid blue' } : { opacity: '0.7' };
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
                        <li className={state.nav1}>
                            <NavLink style={handleStyle} className="textLink " to="phieu-gui-tien">
                                Phiếu Gửi Tiền
                            </NavLink>
                        </li>
                        <li className={state.nav2}>
                            <NavLink style={handleStyle} className="textLink" to="phieu-rut-tien">
                                Phiếu Rút Tiền
                            </NavLink>
                        </li>
                        <li className={state.nav3}>
                            <NavLink style={handleStyle} className="textLink" to="danh-sach-phieu-gui-tien">
                                DS Phiếu Gửi Tiền
                            </NavLink>
                        </li>
                        <li className={location.pathname === '/home/bao-cao-phieu-dong-mo-thang'|| location.pathname === '/home/bao-cao-doanh-so-hoat-dong-ngay' ? 'textLink activeSelect': 'textLink'}>

                                <NavDropdown title="Báo Cáo" bsPrefix={'navDrop'} onSelect={handleBaoCao}>
                                    <NavDropdown.Item eventKey="1">Báo cáo doanh số hoạt động ngày</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="2">Báo cáo phiếu đóng mở tháng</NavDropdown.Item>
                                </NavDropdown>
                        </li>
                        {(managementMode ===true || adminMode===true) && <li className={state.nav5}>
                            <NavLink style={handleStyle} className="textLink" to="thay-doi-quy-dinh">
                                Thay Đổi Quy Định
                            </NavLink>
                            {/* <NavDropdown title="Thay Đổi Quy Định" bsPrefix="navDrop">
                                <NavDropdown.Item>Báo cáo phiếu đóng mở tháng</NavDropdown.Item>
                            </NavDropdown> */}
                        </li>}
                    </ul>
                </nav>
                <div className="account textLink">
                    <NavLink className={'textLink'} to={'user'}>
                        <BsPersonCircle className="userIcon" />
                    </NavLink>
                </div>
            </Container>
            <hr className="hrTop" />
            {/* <hr className='hrBottom' /> */}
        </header>
    );
};

export default Header;
