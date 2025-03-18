import express from "express";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || "8080";

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Connected to Backend" });
});

app.use("/api", require("./routes/projects"));
