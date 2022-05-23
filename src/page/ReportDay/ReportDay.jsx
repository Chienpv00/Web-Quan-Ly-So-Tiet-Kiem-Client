import { useState } from 'react';
import './styles.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import FormField from '../../component/FormField';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import TableCpnForReportDay from './TableCpnForReportDay';

const ReportDay = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [showTable, setShowTable] = useState(false);

    // console.log(dateFomat(startDate, "yyyy"))
    // return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />;
    return (
        <div className="reportDay">
            <h5>Lập báo cáo doanh thu theo ngày</h5>

            <FormField  legend={'Chọn ngày:'}>
                <Row className='mb-3'>
                    <Col sm='2'>
                        <DatePicker className='datePicker' selected={startDate} onChange={(date) => {setStartDate(date); setShowTable(false)}} />
                    </Col>
                    <Col sm='2'>
                        <Button style={{padding: '2px 12px'}} onClick={() => {
                            setShowTable(true)
                        }}>Xuất báo cáo</Button>
                    </Col>
                </Row>
            {showTable&& <TableCpnForReportDay day={dateFormat(startDate,'dd')} month={dateFormat(startDate,'mm')} year={dateFormat(startDate,'yyyy')} />}
            
            </FormField>
            
        </div>
    );
};

export default ReportDay;
