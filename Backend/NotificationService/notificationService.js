const { Server } = require("socket.io");

let io;

const setupWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST", "PUT"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return { sendNotification };
};

const sendNotification = (userId, message) => {
    if (io) {
        io.emit(`notification_${userId}`, { message });
        console.log(`Notification sent to user ${userId}: ${message}`);
    } else {
        console.error("Socket.io instance not initialized!");
    }
};

module.exports = { setupWebSocket, sendNotification };
