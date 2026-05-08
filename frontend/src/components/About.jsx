const About = () => {
    const authors = [
        "Ahmet Yiğit",
        "Muhammet Burak Özyurt",
        "Ahmet Öztürk",
        "Oğulcan Utku Çal",
        "Hasan Demir"
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Hakkında</h2>
            <table border="1" cellPadding="10" style={{ margin: '0 auto', textAlign: 'left', borderCollapse: 'collapse' }}>
                <tbody>
                <tr>
                    <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Authors:</td>
                    <td>
                        {/* İsimleri alt alta sıralı bir şekilde listeliyoruz */}
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            {authors.map((author, index) => (
                                <li key={index} style={{ marginBottom: '5px' }}>
                                    {author}
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Date:</td>
                    <td>{new Date().toLocaleDateString('tr-TR')}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default About;