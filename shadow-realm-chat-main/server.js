const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
const users = new Map();
let messageHistory = [];
const MAX_HISTORY = 50;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle user joining
  socket.on('join', (username) => {
    try {
      if (!username || username.trim().length === 0) {
        socket.emit('error', 'Username cannot be empty');
        return;
      }

      const sanitizedUsername = username.trim().substring(0, 20);
      users.set(socket.id, sanitizedUsername);

      // Send message history to new user
      socket.emit('history', messageHistory);

      // Notify all users about new user
      io.emit('user-joined', {
        username: sanitizedUsername,
        timestamp: new Date().toISOString()
      });

      // Send current user list
      const userList = Array.from(users.values());
      io.emit('user-list', userList);

      console.log(`User joined: ${sanitizedUsername}`);
    } catch (error) {
      console.error('Error in join handler:', error);
      socket.emit('error', 'Failed to join chat');
    }
  });

  // Handle chat messages
  socket.on('chat-message', (message) => {
    try {
      const username = users.get(socket.id);
      
      if (!username) {
        socket.emit('error', 'You must join with a username first');
        return;
      }

      if (!message || message.trim().length === 0) {
        return;
      }

      const sanitizedMessage = message.trim().substring(0, 500);
      const messageData = {
        username,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
        id: Date.now() + Math.random()
      };

      // Add to history
      messageHistory.push(messageData);
      if (messageHistory.length > MAX_HISTORY) {
        messageHistory.shift();
      }

      // Broadcast message to all users
      io.emit('chat-message', messageData);

      console.log(`Message from ${username}: ${sanitizedMessage}`);
    } catch (error) {
      console.error('Error in chat-message handler:', error);
      socket.emit('error', 'Failed to send message');
    }
  });

  // Handle user typing
  socket.on('typing', (isTyping) => {
    try {
      const username = users.get(socket.id);
      if (username) {
        socket.broadcast.emit('user-typing', { username, isTyping });
      }
    } catch (error) {
      console.error('Error in typing handler:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    try {
      const username = users.get(socket.id);
      if (username) {
        users.delete(socket.id);

        // Notify all users about user leaving
        io.emit('user-left', {
          username,
          timestamp: new Date().toISOString()
        });

        // Update user list
        const userList = Array.from(users.values());
        io.emit('user-list', userList);

        console.log(`User disconnected: ${username}`);
      }
    } catch (error) {
      console.error('Error in disconnect handler:', error);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// Start server
server.listen(PORT, () => {
  console.log(`Shadow Realm Chat server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
