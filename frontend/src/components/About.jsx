import React from "react";
import { Card, Container, Table } from "react-bootstrap";

const About = () => {
    const authors = [
        "Ahmet Yiğit",
        "Muhammet Burak Özyurt",
        "Ahmet Öztürk",
        "Oğulcan Utku Çal",
        "Hasan Demir"
    ];

    return (
        // Sayfayı ekrana tam sığdırmak ve ortalamak için wrapper div
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa', // Açık gri arka plan (siyahlığı kırmak için)
            padding: '20px'
        }}>
            <Card style={{
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <Card.Header style={{
                    backgroundColor: '#006699',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textAlign: 'center'
                }}>
                    PROJE EKİBİ VE HAKKINDA
                </Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Table striped bordered hover responsive style={{ marginBottom: 0 }}>
                            <tbody>
                                <tr>
                                    <td style={{
                                        fontWeight: 'bold',
                                        width: '30%',
                                        backgroundColor: '#f1f1f1',
                                        verticalAlign: 'middle'
                                    }}>
                                        Yazarlar (Authors):
                                    </td>
                                    <td>
                                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                            {authors.map((author, index) => (
                                                <li key={index} style={{
                                                    padding: '5px 0',
                                                    borderBottom: index !== authors.length - 1 ? '1px solid #eee' : 'none',
                                                    color: '#333'
                                                }}>
                                                    {author}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#f1f1f1',
                                        verticalAlign: 'middle'
                                    }}>
                                        Tarih (Date):
                                    </td>
                                    <td style={{ color: '#333' }}>
                                        {new Date().toLocaleDateString('tr-TR')}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Banking Management System v1.0
                </Card.Footer>
            </Card>
        </div>
    );
}

export default About;