const express = require("express");
const dotenv = require("dotenv").config();
const contactRouter = require('./routes/contactRoutes')

app = express();

const port = process.env.PORT || 5000;
const rootUrl = process.env.ROOTURL || `/api/v1`;

app.use(`${rootUrl}/contacts`,contactRouter)

// app.get(`${rootUrl}/contacts`, (req, res) => {
//     res.status(200).json({ 
//         data: [],
//         message: "Get all contacts" 
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on Port ${port}!!!......`);
});

// module.exports = {rootUrl,port};