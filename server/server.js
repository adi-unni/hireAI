const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));


app.get('/api', (req, res) => {
  res.json({ fruits: ['apple', 'banana', 'cherry'] });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

