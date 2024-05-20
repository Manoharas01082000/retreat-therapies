const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-pdf', (req, res) => {
    const { therapies, total } = req.body;

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'Summary.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Therapy Summary', { align: 'center' });
    doc.moveDown();

    therapies.forEach(therapy => {
        doc.fontSize(12).text(`${therapy.name}: ${therapy.quantity} x ${therapy.price} = ${therapy.total}`, {
            width: 410,
            align: 'left'
        });
        doc.moveDown();
    });

    doc.moveDown();
    doc.fontSize(14).text(`Net Total: ${total}`, { align: 'right' });

    doc.end();

    doc.on('finish', () => {
        res.download(filePath, 'Summary.pdf', err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error generating PDF');
            } else {
                fs.unlinkSync(filePath);
            }
        });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
