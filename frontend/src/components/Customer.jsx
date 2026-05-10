import {useState, useEffect} from "react";
import axios from "axios";
import {Form, Modal, Card, Container, Button, ButtonGroup, Table} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const {register, resetField, handleSubmit, formState: {errors}} = useForm();
    const [customerObj, setCustomerObj] = useState({id: 0, name: '', city: '', address: ''});
    const [modalUpdate, setModalUpdate] = useState(false);
    const {handleSubmit: handleUpdate} = useForm();

    // Güncelleme işlemi için resmi tutacağımız state
    const [updateImage, setUpdateImage] = useState(null);

    const fetchCustomers = async (url) => {
        await axios.get(url)
            .then((res) => setCustomers(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchCustomers("http://localhost:8080/customer/all");
    }, []);

    const addCustomer = async (data) => {
        // Form verilerini FormData formatına çeviriyoruz
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("address", data.address);

        // Eğer bir resim seçilmişse onu da ekliyoruz
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        await axios.post("http://localhost:8080/customer/add", formData, {
             headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                resetField("name");
                resetField("city");
                resetField("address");
                resetField("image"); // Resim alanını da sıfırlıyoruz
                setModalAdd(false);
                fetchCustomers("http://localhost:8080/customer/all");
            })
            .catch((err) => console.log(err));
    }

    const onDelete = (cid) => {
        let conf = confirm('Customer ' + cid + ' will be deleted!');
        if (conf === true) {
            axios.delete("http://localhost:8080/customer/delete/" + cid)
                .then(() => fetchCustomers("http://localhost:8080/customer/all"))
                .catch((err) => console.log(err));
        }
    }

    const onUpdate = async (cid) => {
        await axios.get("http://localhost:8080/customer/" + cid)
            .then((res) => setCustomerObj(res.data))
            .catch((err) => console.log(err));
        setUpdateImage(null); // Modalı açarken önceki resim seçimini temizle
        setModalUpdate(true);
    };

    const onUpdateSet = async () => {
        // Güncelleme verilerini de FormData formatına çeviriyoruz
        const formData = new FormData();
        formData.append("id", customerObj.id);
        formData.append("name", customerObj.name);
        formData.append("city", customerObj.city);
        formData.append("address", customerObj.address);

        // Yeni bir resim seçilmişse ekliyoruz
        if (updateImage) {
            formData.append("image", updateImage);
        }

        await axios.put("http://localhost:8080/customer/update/" + customerObj.id, formData, {
             headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => fetchCustomers("http://localhost:8080/customer/all"))
            .catch((err) => console.log(err));
        setModalUpdate(false);
    };

    return (
        <div>
            {/* Add a modal for insert */}
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD CUSTOMER</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(addCustomer)}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control type='text'
                                                  placeholder='Name' {...register("name", {required: true})} />
                                    {errors.name && <p style={{color: 'red'}}>Name is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Control type='text'
                                                  placeholder='City' {...register("city", {required: true})} />
                                    {errors.city && <p style={{color: 'red'}}>City is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Control type='text'
                                                  placeholder='Address' {...register("address", {required: true})} />
                                    {errors.address && <p style={{color: 'red'}}>Address is required</p>}
                                </Form.Group>

                                {/* Resim Yükleme Alanı (Ekleme Modalı) */}
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control type='file' accept="image/*" {...register("image")} />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Modal for updating a customer */}
            <Modal show={modalUpdate} onHide={() => {
                setModalUpdate(false)
            }}>
                <Modal.Header closeButton>UPDATE CUSTOMER</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate(onUpdateSet)}>
                                <Form.Group className="mb-3" controlId="cid">
                                    <Form.Control type="text" value={customerObj.id} disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="updateName">
                                    <Form.Control type="text" placeholder="Name" value={customerObj.name}
                                                  onChange={(e) =>
                                                      setCustomerObj({...customerObj, name: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="updateCity">
                                    <Form.Control type="text" placeholder="City" value={customerObj.city}
                                                  onChange={(e) =>
                                                      setCustomerObj({...customerObj, city: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="updateAddress">
                                    <Form.Control type="text" placeholder="Address" value={customerObj.address}
                                                  onChange={(e) =>
                                                      setCustomerObj({...customerObj, address: e.target.value})}/>
                                </Form.Group>

                                {/* Resim Yükleme Alanı (Güncelleme Modalı) */}
                                <Form.Group className="mb-3" controlId="updateImage">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control type="file" accept="image/*"
                                                  onChange={(e) => setUpdateImage(e.target.files[0])}/>
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{float: "right"}}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Show all customers */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>CUSTOMERS</Card.Header>
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
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Address</th>
                                <th scope="col">Operation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers?.map((cust) => (
                                <tr key={cust.id}>
                                    <td>{cust.id}</td>
                                    {/* Müşteri Resmi Gösterim Alanı */}
                                    <td>
                                        {cust.profileImage ? (
                                            <img
                                                src={`http://localhost:8080/uploads/${cust.profileImage}`}
                                                alt="Profile"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td style={{textAlign: "left"}}>{cust.name}</td>
                                    <td style={{textAlign: "left"}}>{cust.city}</td>
                                    <td style={{textAlign: "left"}}>{cust.address}</td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Update">
                                            <Button variant="outline-warning" onClick={() => {
                                                onUpdate(cust.id)
                                            }}>Update</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" onClick={() => {
                                                onDelete(cust.id)
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
export default Customer;