import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { GET_DS_PGT } from './query';

export default function Dspgt({ maKhachHang, getPRT }) {
    const [disCheck, setDisCheck] = useState([]);
    const { loading, error, data, refetch } = useQuery(GET_DS_PGT, {
        variables: { maKhachHang: maKhachHang },
        onCompleted: (result) => {
            setDisCheck(Array(result.getDSPGTbyMaKH.length).fill(false));
        },
    });

  

    if (loading || error) return <></>;

    const handleChange = (e) => {
        if (e.target.checked === true) {
            setDisCheck((pre) => {
                return pre.map((value, index) => {
                    return e.target.value == index ? false : true;
                });
            });
        } else {
            setDisCheck((pre) => {
                return pre.map((value) => {
                    return false;
                });
            });
        }
        getPRT(data.getDSPGTbyMaKH[e.target.value]);
    };

    let i = -1;

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
                    <th>Lựa chọn</th>
                </tr>
            </thead>
            <tbody>
                {data.getDSPGTbyMaKH.map((result, index, arr) => {
                    i++;
                    return (
                        <tr key={result.MaPhieuGoi}>
                            <td>{result.MaKhachHang}</td>
                            <td>{result.MaPhieuGoi}</td>
                            <td>{result.MaLoaiTietKiem}</td>
                            <td>{result.NgayGoi}</td>
                            <td>{result.SoTienGoi}</td>
                            <td>{result.SoDu}</td>
                            <td>{result.NgayDaoHanKeTiep || ''}</td>
                            <td>
                                <Form.Check value={i} onChange={handleChange} disabled={disCheck[i]} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
