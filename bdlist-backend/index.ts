import express from 'express'
const app = express();
const PORT = 2600;

// Parse requests of content-type - application/json.
app.use(express.json());

// get list of sessions
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// get list of users in a specific session
app.get('/', (req, res) => {
  
})

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
