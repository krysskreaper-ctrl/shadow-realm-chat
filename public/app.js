// Register service worker
if ('serviceWorker' in navigator) {
  (async () => {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered');
    } catch (err) {
      console.error('Service Worker failed:', err);
    }
  })();
}

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
let isTyping = false;

// Join chat
function joinChat() {
  const username = usernameInput.value.trim();
  if (!username) return alert('Please enter a username');

  currentUsername = username;
  socket.emit('join', username);

  // Switch screens
  joinScreen.classList.remove('active');
  chatScreen.classList.add('active');

  // Enable inputs
  messageInput.disabled = false;
  sendButton.disabled = false;
  messageInput.focus();
}

// Send message
function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit('chat-message', message);
  messageInput.value = '';
  messageInput.focus();
}

// Typing indicator
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
    messageEl.innerHTML = `<div class="message-content">${messageData.message}</div>`;
  } else {
    const timestamp = new Date(messageData.timestamp).toLocaleTimeString();
    const isOwn = messageData.username === currentUsername;
    messageEl.innerHTML = `
      <div class="message-header">
        <span class="username">${isOwn ? 'You' : messageData.username}</span>
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

// Socket events
socket.on('history', messages => messages.forEach(addMessage));
socket.on('chat-message', addMessage);
socket.on('user-joined', data => addMessage({ message: `${data.username} entered the shadow realm`, timestamp: data.timestamp }, true));
socket.on('user-left', data => addMessage({ message: `${data.username} left the shadow realm`, timestamp: data.timestamp }, true));
socket.on('user-list', updateUserList);
socket.on('user-typing', data => {
  typingIndicator.textContent = data.isTyping ? `${data.username} is typing...` : '';
});
socket.on('error', error => console.error('Socket error:', error));
socket.on('connect_error', () => alert('Failed to connect to the server.'));
socket.on('disconnect', () => addMessage({ message: 'Disconnected from server', timestamp: new Date().toISOString() }, true));
socket.on('reconnect', () => {
  addMessage({ message: 'Reconnected to server', timestamp: new Date().toISOString() }, true);
  if (currentUsername) socket.emit('join', currentUsername);
});

// UI event listeners
joinButton.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', e => e.key === 'Enter' && joinChat());
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', e => e.key === 'Enter' && sendMessage());

// Focus on username input on load
usernameInput.focus();