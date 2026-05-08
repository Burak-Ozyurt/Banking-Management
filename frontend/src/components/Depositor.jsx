import {useState, useEffect} from "react";
import axios from "axios";
import {Form, Modal, Card, Container, Button, ButtonGroup, Table} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Depositor = () => {
    const [depositors, setDepositors] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const {register, resetField, handleSubmit, formState: {errors}} = useForm();

    const fetchDepositors = async (url) => {
        await axios.get(url)
            .then((res) => setDepositors(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchDepositors("http://localhost:8080/depositor/all");
    }, []);

    const addDepositor = async (data) => {
        // Formdan gelen verileri backend'in beklediği DTO formatına uygun gönderiyoruz.
        const depositorDTO = {
            customerId: parseInt(data.customerId),
            accountId: parseInt(data.accountId),
            creationDate: data.creationDate
        };

        await axios.post("http://localhost:8080/depositor/add", depositorDTO)
            .then(() => {
                resetField("customerId");
                resetField("accountId");
                resetField("creationDate");
                setModalAdd(false);
                fetchDepositors("http://localhost:8080/depositor/all");
            })
            .catch((err) => console.log(err));
    }

    const onDelete = (cid) => {
        let conf = confirm('Depositor relation ' + cid + ' will be deleted!');
        if (conf === true) {
            axios.delete("http://localhost:8080/depositor/delete/" + cid)
                .then(() => fetchDepositors("http://localhost:8080/depositor/all"))
                .catch((err) => console.log(err));
        }
    }

    return (
        <div>
            {/* Add a modal for insert */}
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD DEPOSITOR (RELATION)</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(addDepositor)}>
                                <Form.Group className="mb-3" controlId="customerId">
                                    <Form.Control type='number'
                                                  placeholder='Customer ID' {...register("customerId", {required: true})} />
                                    {errors.customerId && <p style={{color: 'red'}}>Customer ID is required</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="accountId">
                                    <Form.Control type='number'
                                                  placeholder='Account ID' {...register("accountId", {required: true})} />
                                    {errors.accountId && <p style={{color: 'red'}}>Account ID is required</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="creationDate">
                                    <Form.Control type='date'
                                                  placeholder='Creation Date' {...register("creationDate", {required: true})} />
                                    {errors.creationDate && <p style={{color: 'red'}}>Creation Date is required</p>}
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Show all depositors */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>DEPOSITORS</Card.Header>
                <Card.Body style={{minHeight: 0}} className="h-100">
                    <Container fluid className="h-100">
                        <ButtonGroup className="float-end mb-2" aria-label="Add">
                            <Button variant="primary" onClick={() => {
                                setModalAdd(true);
                            }}>Add</Button>
                        </ButtonGroup>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Account Number</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Operation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {depositors?.map((dep) => (
                                <tr key={dep.id}>
                                    <td>{dep.id}</td>
                                    <td style={{textAlign: "left"}}>{dep.customer?.name}</td>
                                    <td style={{textAlign: "left"}}>{dep.account?.accountNumber}</td>
                                    <td style={{textAlign: "left"}}>
                                        {dep.creationDate ? new Date(dep.creationDate).toLocaleDateString('tr-TR') : '-'}
                                    </td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" onClick={() => {
                                                onDelete(dep.id)
                                            }}>Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Depositor;