const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:'*'}));  

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/user',require('./Router/userRouter'))



app.listen(5001, () => console.log(`Server running on port 5001`));