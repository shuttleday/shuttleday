import express from 'express'
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Simple Hello World route.
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Set port, listen for requests.
const PORT = 2600;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
