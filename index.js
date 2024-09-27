// Import express
const express = require('express');
const app = express();
const port = 3000;

// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
  res.send('Hello World hé lo from Node.js!');
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
