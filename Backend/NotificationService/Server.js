require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http"); 
const { setupWebSocket } = require("./notificationService"); 
const { sendEmail } = require("./emailService"); 
const { sendSMS } = require("./smsService"); 

const app = express();
const server = http.createServer(app); 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Notification Service Running"));


app.post("/notify", async (req, res) => {
    const { userId, email, phone, message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: "UserId and message are required!" });
    }

    try {
        setupWebSocket().sendNotification(userId, message);
        
        if (email) {
            await sendEmail(email, "Notification", message);
        }

        if (phone) {
            await sendSMS(phone, message);
        }

        res.status(200).json({ success: true, message: "Notification sent successfully!" });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Failed to send notification" });
    }
});

server.listen(5004, () => {
    console.log("Notification Service running on port 5004");
});

setupWebSocket(server);
