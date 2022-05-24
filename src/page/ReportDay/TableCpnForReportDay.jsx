import { useQuery } from '@apollo/client';
import {useState, useEffect} from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { GET_REPORT_DAY } from '../../graphql/queries';

function TableCpnForReportDay({ day, month, year }) {
    const [tc, setTc] = useState(0)
    const [tt, setTt] = useState(0)
    let tempTc = 0;
    let tempTt = 0;
    useEffect(() => {
        setTc(tempTc)
        setTt(tempTt)
    });
    const { data, error, loading } = useQuery(GET_REPORT_DAY, {
        variables: { date: { day: day, month: month, year: year } },
        onCompleted: (value) => {
            console.log(value);
        },
    });
    if (loading) return <Spinner animation="border" />;
    if (error) console.log(error);
    return (
        <>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Số thứ tự</th>
                    <th>Loại tiết kiệm</th>
                    <th>Tổng thu</th>
                    <th>Tổng chi</th>
                    <th>Chênh lệch</th>
                </tr>
            </thead>
            <tbody>
                {data.getReportDay.map((value, index) => {
                        tempTc = value.TongChi + tempTc
                        tempTt =  value.TongThu + tempTt
                    return (
                        <tr key={value.LoaiTietKiem}>
                            <td>{index+1}</td>
                            <td>{value.LoaiTietKiem}</td>
                            <td>{value.TongThu}</td>
                            <td>{value.TongChi}</td>
                            <td>{value.TongThu - value.TongChi}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        <hr />
        <Row>
            <Col sm='8' >
                    
            </Col>
           
            <Col className='fw-bold' style={{paddingRight: '0'}}>
                  <p>Tổng thu toàn bộ:</p>  
                  <p>Tổng chi toàn bộ:</p>
                  <hr />

                  <p>Tổng chênh lệch toàn bộ:</p>
            </Col>
            <Col className='text-end' style={{paddingLeft: '0'}}>
                    <p>{tt}</p>
                    <p>{tc}</p>
                    <hr />
                    <p>{tt-tc}</p>
            </Col>

        </Row>
        </>
    );
}

export default TableCpnForReportDay;
