import { useQuery } from '@apollo/client';
import React from 'react';
import { Table } from 'react-bootstrap';
import { GET_DS_PGT } from './query';

export default function Dspgt({maKhachHang}) {
    const { loading, error, data } = useQuery(GET_DS_PGT, {variables: {maKhachHang: maKhachHang}});
    if (loading || error) return <></>;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Mã KH</th>
                    <th>Mã Phiếu Gởi</th>
                    <th>Mã Loại TK</th>
                    <th>Ngày Gởi</th>
                    <th>Số Tiền Gởi</th>
                    <th>Số Dư Hiện Tại</th>
                    <th>Ngày Đáo Hạn</th>
                    <th>Lựa chọn</th>
                </tr>
            </thead>
            <tbody>
                {data.getDSPGTbyMaKH.map((result) => {
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
