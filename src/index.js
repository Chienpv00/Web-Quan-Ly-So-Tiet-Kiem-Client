import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import store from './app/store';
// import component
import Login from './page/Login/Login';
import Home from './page/Home/Home';

import WithdrawalSlip from './page/WithdrawalSlip'
import PhieuGuiTien from './page/phieuGuiTien/PhieuGuiTien';
import ListPgt from './page/ListPgt/ListPgt';
import ReportDay from './page/ReportDay/ReportDay';
import ReportOCMonth from './page/ReportOpenCloseMonth/ReportOCMonth';
import ChangeRules from './page/ChangeRules/ChangeRules';
import User from './page/User';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

// const client = ...

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="" element={<Login />} />
                            <Route path="home" element={<Home />}>
                                <Route index element={<div>Vui lòng chọn tính năng</div>} />
                                <Route path="phieu-rut-tien" element={<WithdrawalSlip />} />
                                <Route path="phieu-gui-tien" element={<PhieuGuiTien />} />
                                <Route path="danh-sach-phieu-gui-tien" element={<ListPgt />} />
                                <Route path="bao-cao-doanh-so-hoat-dong-ngay" element={<ReportDay />} />
                                <Route path="bao-cao-phieu-dong-mo-thang" element={<ReportOCMonth />} />
                                <Route path="thay-doi-quy-dinh" element={<ChangeRules />} />
                                <Route path="user" element={<User />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<h2>Nothing here</h2>} />
                    </Routes>
                </ApolloProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
