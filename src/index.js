const express = require("express");
const jobController = require("./Controller/jobs.router");
const dbConnect = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
let PORT =process.env.PORT || 8080;


app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/job", jobController);

app.listen(PORT||8080, async () => {
  await dbConnect();
  console.log(`Listening on http://localhost:${PORT}`);
});
