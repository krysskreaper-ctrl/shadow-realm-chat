# shadow-realm-chat

A dark-themed real-time chat application built with Node.js, Express, and Socket.io.

## Features

- Real-time messaging using WebSocket connections
- Dark "shadow realm" themed UI
- User join/leave notifications
- Live user list showing all connected users
- Typing indicators
- Message history (last 50 messages)
- Automatic reconnection handling
- Input validation and XSS protection
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
```bash
git clone https://github.com/krysskreaper-ctrl/shadow-realm-chat.git
cd shadow-realm-chat
```

2. Install dependencies:
```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

For development:
```bash
npm run dev
```

## Configuration

You can set a custom port using the PORT environment variable:
```bash
PORT=8080 npm start
```

## Project Structure

```
shadow-realm-chat/
├── public/
│   ├── index.html    # Main HTML file
│   ├── style.css     # Dark theme styling
│   └── app.js        # Client-side JavaScript
├── server.js         # Express and Socket.io server
├── package.json      # Project dependencies
└── README.md         # This file
```

## Stability Features

- Error handling for all socket events
- Graceful server shutdown (SIGTERM/SIGINT)
- Connection error handling with automatic reconnection
- Input sanitization (username max 20 chars, messages max 500 chars)
- XSS protection through HTML escaping
- Message history limit to prevent memory issues
- User session management

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **HTML5/CSS3** - Modern web standards
- **JavaScript (ES6+)** - Client-side scripting

## Contributing

Feel free to open issues or submit pull requests to improve the application.

## License

ISC

