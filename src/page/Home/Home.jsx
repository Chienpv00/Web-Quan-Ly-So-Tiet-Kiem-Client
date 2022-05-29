import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../../component/Header';

const Home = () => {
    return (
        <div>
            <Header adminMode={true} />
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default Home;
