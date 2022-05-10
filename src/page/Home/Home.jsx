import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Header } from '../../component';

const Home = () => {
    return (
        <div>
            <Container>
                <Header adminMode={true} />
                <Outlet />
            </Container>
        </div>
    );
};

export default Home;
