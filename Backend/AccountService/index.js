require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("Account Service Running"));
app.use("/account", require("./Routes/accountRoutes"));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Account Service: MongoDB connected"))
    .catch(err => console.log(err));

app.listen(5003, () => console.log("Account Service running on port 5003"));
