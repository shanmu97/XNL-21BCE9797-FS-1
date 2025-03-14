const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer();
const io = socketIo(server, { cors: { origin: '*' } });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'*'}));  

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));

app.use("/transaction", require('./Routes/transactionRoutes'));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});
module.exports = {server,io};

app.get('/', (req, res) => {
    res.send("API is running...");
});


app.listen(5002, () => console.log(`Server running on port 5002`));