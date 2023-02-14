import express from "express";
import { connect } from "mongoose";
import { User } from "./models/user";

const app = express();
const PORT = 2600;

// Parse requests of content-type - application/json.
app.use(express.json());



// get list of sessions
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// get list of users in a specific session
app.get("/test2", async (req, res) => {
  const user = new User({
    name: "Bill",
    email: "somemail@email.com"
  });
  await user.save();

  console.log(user.name); // Bill
  res.json({ message: user.name})
});

// start server
app.listen(PORT, async () => {
  await connect("mongodb://127.0.0.1:2500/production");
  console.log(`Server is running on port ${PORT}.`);
});
