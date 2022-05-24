import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Table, Row, Col } from 'react-bootstrap';
import { GET_REPORT_OC_MONTH } from '../../graphql/queries';

function TableRPOC({ input }) {
    console.log('🚀 ~ file: TableRPOC.jsx ~ line 5 ~ TableRPOC ~ input', input);
    const { data, loading, error } = useQuery(GET_REPORT_OC_MONTH, { variables: input });

    const [tc, setTc] = useState(0);
    const [tt, setTt] = useState(0);
    let tempTc = 0;
    let tempTt = 0;
    useEffect(() => {
        setTc(tempTc);
        setTt(tempTt);
    }, [tempTc, tempTt]);

    if (loading) return <Spinner />;
    return (
        <>
            <div className="rpOC">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ngày</th>
                            <th>Số phiếu mở</th>
                            <th>Số phiếu đóng</th>
                            <th>Chênh lệch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getReportOCMonth.map((value, index) => {
                            tempTc += value.open;
                            tempTt += value.close
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.day}</td>
                                    <td>{value.open}</td>
                                    <td>{value.close}</td>
                                    <td>{Math.abs(value.open - value.close)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <hr />
            <Row>
                <Col sm="8"></Col>

                <Col className="fw-bold" style={{ paddingRight: '0' }}>
                    <p>Tổng phiếu mở:</p>
                    <p>Tổng phiếu đóng:</p>
                    <hr />

                    <p>Tổng chênh lệch:</p>
                </Col>
                <Col className="text-end" style={{ paddingLeft: '0' }}>
                    <p>{tc}</p>
                    <p>{tt}</p>
                    <hr />
                    <p>{Math.abs(tt - tc)}</p>
                </Col>
            </Row>
        </>
    );
}

export default TableRPOC;
