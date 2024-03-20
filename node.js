const express = require('express');
const app = express();
const pdfkit = require('pdfkit');

let stockData = []; // Array to store stock data

app.use(express.json());

// Route to receive and store stock data
app.post('/addStock', (req, res) => {
  const { stockName, quantity, hiddenCode } = req.body;
  stockData.push({ stockName, quantity, hiddenCode });
  res.sendStatus(200);
});

// Route to generate PDF
app.get('/generatePDF', (req, res) => {
  const doc = new pdfkit();
  doc.pipe(res);

  // Formatting and writing stock data to PDF
  doc.text('Klassic Kurta Stock List', { align: 'center' });
  doc.moveDown();
  stockData.forEach(item => {
    doc.text(${item.stockName} - Quantity: ${item.quantity} - Hidden Code: ${item.hiddenCode});
    doc.moveDown();
  });

  doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});