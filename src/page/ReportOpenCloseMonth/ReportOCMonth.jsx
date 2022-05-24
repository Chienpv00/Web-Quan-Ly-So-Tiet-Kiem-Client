import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';
import FormField from '../../component/FormField';
import { useForm } from 'react-hook-form';
import TableRPOC from './TableRPOC';
import './styles.scss'

function ReportOCMonth() {
    const {
        register,
        handleSubmit,
        getValues
    } = useForm();

    const [state, setstate] = useState(false);

    const onSubmit = handleSubmit((value) => {
        // console.log(value);
        setstate(true)
    });

    const handleChange = () => { 
        setstate(false)
     }
    return (
        <div>
            <h5>Báo cáo phiếu đóng mở tháng</h5>
            <FormField legend={'Bộ lọc: '} onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="2">
                        <Form.Label>Tháng</Form.Label>
                        <Form.Select {...register('month')} onChange={handleChange}>
                            {new Array(12).fill({}).map((value, index) => {
                                return (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col sm="2">
                        <Form.Label>Năm</Form.Label>
                        <Form.Select {...register('year')} onChange={handleChange}>
                            {new Array(10).fill({ y: 2018 }).map((value, index) => {
                                return (
                                    <option key={index} value={value.y + index}>
                                        {value.y + index}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col sm="2">
                        <Button style={{ marginTop: '32px' }} className="btnSubmit" type="submit">
                            Xuất báo cáo
                        </Button>
                    </Col>
                </Form.Group>
                {state && <TableRPOC  input={getValues()}/>}
            </FormField>
        </div>
    );
}

export default ReportOCMonth;
