import { useState } from "react";
import axios from "axios";
import { Card, Container, Button, Table, Alert } from "react-bootstrap";

const Pdf = () => {
    const [message, setMessage] = useState("");

    // Ortak PDF oluşturma fonksiyonu
    const generateReport = async (endpoint, name) => {
        setMessage(`${name} raporu hazırlanıyor, lütfen bekleyin...`);

        await axios.get(`http://localhost:8080/${endpoint}/report/pdf`)
            .then((res) => {
                // Backend'deki JasperReports genelde dosyanın kaydedildiği yolu döndürür
                setMessage(`${name} raporu başarıyla oluşturuldu!`);
                alert(`İşlem Başarılı:\n${res.data}`);
            })
            .catch((err) => {
                console.log(err);
                setMessage(`${name} raporu oluşturulurken bir hata meydana geldi.`);
            });
    };

    return (
        <div>
            <Card className="h-30 d-flex flex-column">
                <Card.Header>PDF RAPORLARI (JASPER REPORTS)</Card.Header>
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
                                <th scope="col">Rapor Türü</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Müşteriler Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Müşteri Raporu</td>
                                <td style={{ textAlign: "left" }}>Tüm müşterilerin listesini ve kişisel bilgilerini PDF olarak dışa aktarır.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('customer', 'Müşteri')}>
                                        PDF Oluştur
                                    </Button>
                                </td>
                            </tr>

                            {/* Hesaplar Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Hesap Raporu</td>
                                <td style={{ textAlign: "left" }}>Sistemdeki tüm banka hesaplarını ve bakiye durumlarını PDF olarak dışa aktarır.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('account', 'Hesap')}>
                                        PDF Oluştur
                                    </Button>
                                </td>
                            </tr>

                            {/* İlişkiler (Depositor) Raporu */}
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Müşteri - Hesap İlişki Raporu</td>
                                <td style={{ textAlign: "left" }}>Hangi müşterinin hangi hesaba sahip olduğunu (Depositor) PDF olarak dışa aktarır.</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => generateReport('depositor', 'İlişki (Depositor)')}>
                                        PDF Oluştur
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