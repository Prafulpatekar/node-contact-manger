const express = require("express");
const dotenv = require("dotenv").config();
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/database");

app = express();

const port = process.env.PORT || 5000;
const rootUrl = process.env.ROOTURL || "/api/v1";
app.use(express.json());
app.use(`${rootUrl}/contacts`, contactRouter);
app.use(`${rootUrl}/users`, userRouter);
app.use(errorHandler);

app.listen(port, () => {
  dbConnection();
  console.log(`Server is running on Port ${port}!!!......`);
});

// 404 Page
app.use((req, res) => {
  res.status(404);
  throw new Error("Not found 🚫🚫🚫!");
});
