import { useQuery } from '@apollo/client';
import React from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { FILTER_LIST_PGT } from './graphql';

function TablePGT({ customerData }) {
    console.log('🚀 ~ file: TablePGT.jsx ~ line 7 ~ TablePGT ~ customerData', customerData);

    const { data, loading, error } = useQuery(FILTER_LIST_PGT, { variables: { input: customerData } });

    if (loading) return <>
    <Spinner animation="grow" variant="primary" />
  <Spinner animation="grow" variant="secondary" />
  <Spinner animation="grow" variant="success" />
  <Spinner animation="grow" variant="danger" />
  <Spinner animation="grow" variant="warning" />
  <Spinner animation="grow" variant="info" />
  <Spinner animation="grow" variant="light" />
  <Spinner animation="grow" variant="dark" />
    </>

    return (
        <Table style={{ overflowY: 'auto', height: '200px !important' }} responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Mã KH</th>
                    <th>Mã Phiếu Gởi</th>
                    <th>Mã Loại TK</th>
                    <th>Ngày Gởi</th>
                    <th>Số Tiền Gởi</th>
                    <th>Số Dư Hiện Tại</th>
                    <th>Ngày Đáo Hạn</th>
                </tr>
            </thead>
            <tbody>
                {data?.filterPGT.map((result, index, arr) => {
                    return (
                        <tr key={result.MaPhieuGoi}>
                            <td>{result.MaKhachHang}</td>
                            <td>{result.MaPhieuGoi}</td>
                            <td>{result.MaLoaiTietKiem}</td>
                            <td>{result.NgayGoi}</td>
                            <td>{result.SoTienGoi}</td>
                            <td>{result.SoDu}</td>
                            <td>{result.NgayDaoHanKeTiep || ''}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default TablePGT;
