import { useState, useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { GET_LOAI_TIET_KIEM } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';

function TableRules({ handleDelete, reFetch, nav }) {
    const { data, loading, error, refetch } = useQuery(GET_LOAI_TIET_KIEM);
    

    useEffect(() => {
        if (reFetch === true) {
            refetch();
        }

        if (nav[1] === true) {
            refetch();
        }
    }, [reFetch, nav]);

    const sendCode = (e) => {
        handleDelete(e.target.value);
    };

    if (loading) return <Spinner></Spinner>;
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Kỳ hạn</th>
                        <th>Lãi suất</th>
                        <th>Ngày áp dụng</th>
                    </tr>
                </thead>

                <tbody>
                    {data.getLoaitk.map((value) => {
                        return (
                            <tr key={value.MaLoaiTietKiem}>
                                <td>{value.MaLoaiTietKiem}</td>
                                <td>{value.TenLoaiTietKiem}</td>
                                <td>{value.KyHan}</td>
                                <td>{value.LaiSuatHienTai}</td>
                                <td>{value.NgayApDung}</td>
                                <td>
                                    <Button value={value.MaLoaiTietKiem} onClick={sendCode}>
                                        Xóa{' '}
                                    </Button>{' '}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default TableRules;
