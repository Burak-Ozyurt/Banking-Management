import { useState } from "react";
import axios from "axios";
import { Card, Container, Button, Table, Alert } from "react-bootstrap";

const Pdf = () => {
    const [message, setMessage] = useState("");

    // Ortak PDF oluşturma fonksiyonu
    const generateReport = async (endpoint, name) => {
        setMessage(`${name} report is being prepared, please wait...`);

        await axios.get(`http://localhost:8080/${endpoint}/report/pdf`)
            .then((res) => {
                // Backend'deki JasperReports genelde dosyanın kaydedildiği yolu döndürür
                setMessage(`${name} report created successfully!`);
                alert(`Action Successful:\n${res.data}`);
            })
            .catch((err) => {
                console.log(err);
                setMessage(`An error occurred while creating the ${name} report.`);
            });
    };

    return (
        <div>
            <Card className="h-30 d-flex flex-column">
                <Card.Header>PDF REPORTS</Card.Header>
                <Card.Body style={{ minHeight: 0 }} className="h-100">
                    <Container fluid className="h-100">

                        {/* Kullanıcıya bilgi vermek için uyarı mesajı alanı */}
                        {message && (
                            <Alert variant="info" onClose={() => setMessage("")} dismissible>
                                {message}
                            </Alert>
                        )}

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th scope="col">Report Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Müşteriler Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Customer Report</td>
                                <td style={{ textAlign: "left" }}>Exports the list of all customers and their personal information as a PDF.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('customer', 'Customer')}>
                                        Generate PDF
                                    </Button>
                                </td>
                            </tr>

                            {/* Hesaplar Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Account Report</td>
                                <td style={{ textAlign: "left" }}>Exports all bank accounts in the system and their balance status as a PDF.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('account', 'Account')}>
                                        Generate PDF
                                    </Button>
                                </td>
                            </tr>

                            {/* İlişkiler (Depositor) Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Depositor Report</td>
                                <td style={{ textAlign: "left" }}>Exports which customer owns which account (Depositor) as a PDF.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('depositor', 'Relationship (Depositor)')}>
                                        Generate PDF
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Pdf;