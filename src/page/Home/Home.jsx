import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../../component/Header';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

    const userData = useSelector((state) =>  state.login )
    console.log("🚀 ~ file: Home.jsx ~ line 10 ~ Home ~ userData", userData)
    return (
        <div>
            <Header adminMode={userData.MaNhom === 'N1'} userMode = {userData.MaNhom === 'N3'} managementMode={userData.MaNhom === 'N2'} />
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default Home;
