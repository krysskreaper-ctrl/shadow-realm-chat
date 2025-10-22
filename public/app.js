// Initialize socket connection
const socket = io();

// DOM elements
const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinButton = document.getElementById('join-button');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');
const userList = document.getElementById('user-list');
const userCount = document.getElementById('user-count');
const typingIndicator = document.getElementById('typing-indicator');

let currentUsername = '';
let typingTimeout;

// Join chat
function joinChat() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter a username');
        return;
    }

    currentUsername = username;
    socket.emit('join', username);
    
    // Switch to chat screen
    joinScreen.classList.remove('active');
    chatScreen.classList.add('active');
    
    // Enable chat input
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) {
        return;
    }

    socket.emit('chat-message', message);
    messageInput.value = '';
    messageInput.focus();
}

// Handle typing indicator
let isTyping = false;
messageInput.addEventListener('input', () => {
    if (!isTyping) {
        isTyping = true;
        socket.emit('typing', true);
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        isTyping = false;
        socket.emit('typing', false);
    }, 1000);
});

// Add message to chat
function addMessage(messageData, isSystem = false) {
    const messageEl = document.createElement('div');
    messageEl.className = isSystem ? 'message system' : 'message';
    
    if (isSystem) {
        messageEl.innerHTML = `
            <div class="message-content">${messageData.message}</div>
        `;
    } else {
        const timestamp = new Date(messageData.timestamp).toLocaleTimeString();
        const isOwnMessage = messageData.username === currentUsername;
        
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="username">${isOwnMessage ? 'You' : messageData.username}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-content">${escapeHtml(messageData.message)}</div>
        `;
    }
    
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update user list
function updateUserList(users) {
    userList.innerHTML = '';
    userCount.textContent = `${users.length} user${users.length !== 1 ? 's' : ''} online`;
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
}

// Socket event listeners
socket.on('history', (messages) => {
    messages.forEach(msg => addMessage(msg));
});

socket.on('chat-message', (messageData) => {
    addMessage(messageData);
});

socket.on('user-joined', (data) => {
    addMessage({
        message: `${data.username} entered the shadow realm`,
        timestamp: data.timestamp
    }, true);
});

socket.on('user-left', (data) => {
    addMessage({
        message: `${data.username} left the shadow realm`,
        timestamp: data.timestamp
    }, true);
});

socket.on('user-list', (users) => {
    updateUserList(users);
});

socket.on('user-typing', (data) => {
    if (data.isTyping) {
        typingIndicator.textContent = `${data.username} is typing...`;
    } else {
        typingIndicator.textContent = '';
    }
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
    alert(error);
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    alert('Failed to connect to the server. Please try again.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    addMessage({
        message: 'Disconnected from server',
        timestamp: new Date().toISOString()
    }, true);
});

socket.on('reconnect', () => {
    console.log('Reconnected to server');
    addMessage({
        message: 'Reconnected to server',
        timestamp: new Date().toISOString()
    }, true);
    
    // Rejoin with username
    if (currentUsername) {
        socket.emit('join', currentUsername);
    }
});

// Event listeners
joinButton.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinChat();
    }
});

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus on username input on load
usernameInput.focus();
