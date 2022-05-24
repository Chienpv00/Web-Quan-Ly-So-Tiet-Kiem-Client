import { useState } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import AddRules from './AddRules';
import DeleteRules from './DeleteRules';
import './styles.scss';
import UpdateRules from './UpdateRules';


function ChangeRules() {
    const [nav, setNav] = useState([true, false, false]);

    const RenderCreateCus = () => {
        setNav([false, true, false]);
    };

    const RenderSearchCus = () => {
        setNav([true, false, false]);
    };

    const RenderUpdate = () => {
        setNav([false, false, true]);
    };


    
    return (
        <div>
            <div className="changeRules">
                <h5>THAY ĐỔI QUY ĐỊNH</h5>
                <Row>
                    <Col sm="2" className="subNav">
                        <Nav className="flex-column">
                            <Nav.Item className={nav[0] ? 'subNavItem active' : 'subNavItem'} onClick={RenderSearchCus}>
                                <span>Thêm loại tiết kiệm</span>
                            </Nav.Item>
                            <Nav.Item className={nav[1] ? 'subNavItem active' : 'subNavItem'} onClick={RenderCreateCus}>
                                <span>Xóa loại tiết kiệm</span>
                            </Nav.Item>
                            <Nav.Item className={nav[2] ? 'subNavItem active' : 'subNavItem'} onClick={RenderUpdate}>
                                <span>Sửa loại tiết kiệm</span>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm="10">
                        {nav[0] && (
                            <>
                            <AddRules/>
                            </>
                        )}

                        {nav[1] && <>
                            <DeleteRules  nav={nav}/>
                        </>}
                        {nav[2] && <>
                            <UpdateRules nav={nav}/>
                        </>}
                    </Col>
                </Row>
            </div>
        </div>
    );
}



export default ChangeRules;
