import FormField from '../../../component/FormField';
import { useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Inputbs from '../../../component/Inputbs';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../../../graphql/mutations';
import { Table } from 'react-bootstrap';

const CreateCus = () => {
    // khai bao useState cho model tao khach hang
    const [showModal2, setshowModal2] = useState(false);
    const [modal0, setModal0] = useState(true);

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [data1, setData1] = useState();
    const [sizeModal, setSizeModal] = useState('');

    const {
        register,
        handleSubmit,
        resetField,
        clearErrors,
        getValues,
        formState: { errors },
    } = useForm();

    const [createCustomer, { data, loading, error, reset }] = useMutation(CREATE_CUSTOMER);

    const handleClose = () => {
        setshowModal2(false);
        setModal0(true);
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setSizeModal('');
        reset();
        resetField('name');
        resetField('phone');
        resetField('address');
        resetField('cmnd');
    };

    let dataHookForm;
    const submitCreCus = () => {
        dataHookForm = getValues();

        createCustomer({
            variables: {
                tenKhachHang: dataHookForm.name,
                diaChi: dataHookForm.address,
                cmnd: dataHookForm.cmnd,
                sdt: dataHookForm.phone,
            },
            onCompleted: (result) => {
                setData1(result);
                setModal0(false);
                if (result.createKhachHang.success === true) {
                    setModal1(true);
                    setModal3(true);
                    setSizeModal('lg');
                } else {
                    setModal2(true);
                }
            },
        });
    };

    const handleCreateCus = handleSubmit((result) => {});
    return (
        <FormField legend={'T???o kh??ch h??ng m???i:'} onSubmit={handleCreateCus}>
            <Form.Group as={Row}>
                <Col sm="6">
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>T??n Kh??ch H??ng:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Inputbs
                                title={'name'}
                                register={register}
                                required
                                errors={errors?.name}
                                pattern={/[a-zA-z0-9]/}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>?????a ch???:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Inputbs
                                title={'address'}
                                register={register}
                                required
                                errors={errors?.address}
                                as="textarea"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm="6">
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>CMND/CCCD:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Inputbs
                                title={'cmnd'}
                                errors={errors?.cmnd}
                                register={register}
                                pattern={/[0-9]/}
                                minLength={9}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm="4">
                            <Form.Label>SDT:</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Inputbs
                                required
                                title={'phone'}
                                errors={errors?.phone}
                                register={register}
                                pattern={/[0-9]/}
                            />
                        </Col>
                    </Row>
                </Col>
            </Form.Group>
            <hr />
            <Button
                type="submit"
                className="mb-2"
                onClick={() => {
                    if (errors.cmnd == null && errors.phone == null && errors.address == null && errors.name == null) {
                        setshowModal2(true);
                    }
                }}
            >
                T???o kh??ch h??ng
            </Button>
            <Modal size={sizeModal} backdrop="static" onHide={handleClose} show={showModal2} centered animation>
                <Modal.Header closeButton>
                    {' '}
                    <Modal.Title className="text-center text-dark modal1">
                        B???n c?? ch???c ch???n t???o kh??ch h??ng n??y?
                    </Modal.Title>
                </Modal.Header>
                {modal0 && (
                    <Modal.Body className="text-center text-primary">
                        <Row>
                            <Col>
                                <Button
                                    onClick={() => {
                                        setshowModal2(false);
                                    }}
                                    variant="secondary"
                                >
                                    H???y
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={submitCreCus}>X??c nh???n</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                )}
                {modal1 && (
                    <Modal.Body className="text-center text-success">
                        ??? T???o kh??ch h??ng th??nh c??ng!!{' '}
                        {loading
                            ? ' '
                            : modal3 && (
                                  <Table>
                                      <Table className="mt-3" striped bordered hover size="sm">
                                          <thead>
                                              <tr>
                                                  <th>M?? kh??ch h??ng</th>
                                                  <th>T??n kh??ch h??ng</th>
                                                  <th>CMND/CCCD</th>
                                                  <th>SDT</th>
                                                  <th>?????a ch???</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                  <td>{data1?.createKhachHang?.khachhang.MaKhachHang}</td>
                                                  <td>{data1?.createKhachHang?.khachhang.TenKhachHang}</td>
                                                  <td>{data1?.createKhachHang?.khachhang.CMND}</td>
                                                  <td>{data1?.createKhachHang?.khachhang.SDT}</td>
                                                  <td>{data1?.createKhachHang?.khachhang.DiaChi}</td>
                                              </tr>
                                          </tbody>
                                      </Table>
                                  </Table>
                              )}{' '}
                    </Modal.Body>
                )}
                {modal2 && (
                    <Modal.Body className="text-center text-danger">
                        ?????? T???o kh??ch h??ng th???t b???i!!, Tr??ng CMND/CCCD
                    </Modal.Body>
                )}
            </Modal>
        </FormField>
    );
};

export default CreateCus;
