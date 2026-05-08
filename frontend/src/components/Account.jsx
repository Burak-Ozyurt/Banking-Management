import {useState, useEffect} from "react";
import axios from "axios";
import {Form, Modal, Card, Container, Button, ButtonGroup, Table} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Account = () => {
    const [accounts, setAccounts] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const {register, resetField, handleSubmit, formState: {errors}} = useForm();
    const [accountObj, setAccountObj] = useState({id: 0, accountNumber: '', balance: '', branchName: ''});
    const [modalUpdate, setModalUpdate] = useState(false);
    const {handleSubmit: handleUpdate} = useForm();

    const fetchAccounts = async (url) => {
        await axios.get(url)
            .then((res) => setAccounts(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchAccounts("http://localhost:8080/account/all");
    }, []);

    const addAccount = async (data) => {
        await axios.post("http://localhost:8080/account/add", data)
            .then(() => {
                resetField("accountNumber");
                resetField("balance");
                resetField("branchName");
                setModalAdd(false);
                fetchAccounts("http://localhost:8080/account/all");
            })
            .catch((err) => console.log(err));
    }

    const onDelete = (cid) => {
        let conf = confirm('Account ' + cid + ' will be deleted!');
        if (conf === true) {
            axios.delete("http://localhost:8080/account/delete/" + cid)
                .then(() => fetchAccounts("http://localhost:8080/account/all"))
                .catch((err) => console.log(err));
        }
    }

    const onUpdate = async (cid) => {
        await axios.get("http://localhost:8080/account/" + cid)
            .then((res) => setAccountObj(res.data))
            .catch((err) => console.log(err));
        setModalUpdate(true);
    };

    const onUpdateSet = async () => {
        await axios.put("http://localhost:8080/account/update/" + accountObj.id, accountObj)
            .then(() => fetchAccounts("http://localhost:8080/account/all"))
            .catch((err) => console.log(err));
        setModalUpdate(false);
    };

    return (
        <div>
            {/* Add a modal for insert */}
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD ACCOUNT</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(addAccount)}>
                                <Form.Group className="mb-3" controlId="accountNumber">
                                    <Form.Control type='text'
                                                  placeholder='Account Number' {...register("accountNumber", {required: true})} />
                                    {errors.accountNumber && <p style={{color: 'red'}}>Account Number is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="balance">
                                    <Form.Control type='number'
                                                  placeholder='Balance' {...register("balance", {required: true})} />
                                    {errors.balance && <p style={{color: 'red'}}>Balance is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="branchName">
                                    <Form.Control type='text'
                                                  placeholder='Branch Name' {...register("branchName", {required: true})} />
                                    {errors.branchName && <p style={{color: 'red'}}>Branch Name is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Modal for updating an account */}
            <Modal show={modalUpdate} onHide={() => {
                setModalUpdate(false)
            }}>
                <Modal.Header closeButton>UPDATE ACCOUNT</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate(onUpdateSet)}>
                                <Form.Group className="mb-3" controlId="cid">
                                    <Form.Control type="text" value={accountObj.id} disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="accountNumber">
                                    <Form.Control type="text" placeholder="Account Number" value={accountObj.accountNumber}
                                                  onChange={(e) =>
                                                      setAccountObj({...accountObj, accountNumber: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="balance">
                                    <Form.Control type="number" placeholder="Balance" value={accountObj.balance}
                                                  onChange={(e) =>
                                                      setAccountObj({...accountObj, balance: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="branchName">
                                    <Form.Control type="text" placeholder="Branch Name" value={accountObj.branchName}
                                                  onChange={(e) =>
                                                      setAccountObj({...accountObj, branchName: e.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Show all accounts */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>ACCOUNTS</Card.Header>
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
                                <th scope="col">Account Number</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Branch Name</th>
                                <th scope="col">Operation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accounts?.map((acc) => (
                                <tr key={acc.id}>
                                    <td>{acc.id}</td>
                                    <td style={{textAlign: "left"}}>{acc.accountNumber}</td>
                                    <td style={{textAlign: "left"}}>{acc.balance} ₺</td>
                                    <td style={{textAlign: "left"}}>{acc.branchName}</td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Update">
                                            <Button variant="outline-warning" onClick={() => {
                                                onUpdate(acc.id)
                                            }}>Update</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" onClick={() => {
                                                onDelete(acc.id)
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
export default Account;