require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));
app.use('/api/transactions', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));
app.use('/api/accounts', createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
app.use('/api/notifications', createProxyMiddleware({ target: 'http://localhost:5004', changeOrigin: true }));

app.listen(5000, () => console.log("API Gateway running on port 5000"));
