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

## Deployment

This application can be deployed to various cloud platforms. Below are instructions for Heroku and Vercel deployments, including automated deployment via GitHub Actions.

### Deploy to Heroku

#### Manual Deployment

1. **Prerequisites:**
   - Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   - Create a [Heroku account](https://signup.heroku.com/)

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**
   ```bash
   heroku create your-app-name
   ```

4. **Deploy the application:**
   ```bash
   git push heroku main
   ```
   
   Or if you're on a different branch:
   ```bash
   git push heroku your-branch:main
   ```

5. **Open your application:**
   ```bash
   heroku open
   ```

6. **View logs (if needed):**
   ```bash
   heroku logs --tail
   ```

#### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-heroku.yml`) for automated Heroku deployments.

**Setup:**

1. Get your Heroku API key from [Account Settings](https://dashboard.heroku.com/account)
2. Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `HEROKU_API_KEY`: Your Heroku API key
   - `HEROKU_APP_NAME`: Your Heroku app name
   - `HEROKU_EMAIL`: Your Heroku account email

The workflow will automatically deploy to Heroku when you push to the `main` or `master` branch.

### Deploy to Vercel

#### Manual Deployment

1. **Prerequisites:**
   - Install the [Vercel CLI](https://vercel.com/download)
   - Create a [Vercel account](https://vercel.com/signup)

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy the application:**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

4. Follow the CLI prompts to complete the deployment.

#### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-vercel.yml`) for automated Vercel deployments.

**Setup:**

1. Install Vercel CLI locally: `npm i -g vercel`
2. Link your project: `vercel link`
3. Get your Vercel token from [Account Settings → Tokens](https://vercel.com/account/tokens)
4. Get your project details:
   ```bash
   cat .vercel/project.json
   ```
5. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID (from project.json)
   - `VERCEL_PROJECT_ID`: Your Vercel project ID (from project.json)

The workflow will automatically deploy to Vercel when you push to the `main` or `master` branch.

#### Alternative: Vercel Git Integration

You can also connect your GitHub repository directly to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the settings and deploy

### GitHub Pages

**Note:** GitHub Pages is designed for static websites and does not support Node.js server applications or WebSocket connections required by this chat application. GitHub Pages cannot run the Express server or Socket.io needed for real-time functionality.

**For static deployments only**, you would need to:
- Modify the application to use a different backend (e.g., Firebase, PubNub)
- Convert the app to a client-side only application
- Use a third-party WebSocket service

**Recommended alternatives for this application:**
- **Heroku** (best for WebSocket support, free tier available)
- **Vercel** (serverless functions, excellent performance)
- **Railway** (similar to Heroku)
- **Render** (free tier with WebSocket support)

### Environment Variables

When deploying, ensure the following environment variables are set (most platforms set PORT automatically):

- `PORT`: The port on which the server will run (automatically set by most platforms)

### Continuous Integration

The repository includes a CI workflow (`.github/workflows/ci.yml`) that:
- Runs on all pushes and pull requests to `main`/`master`
- Tests the application on Node.js versions 18.x and 20.x
- Checks for security vulnerabilities
- Performs a smoke test to ensure the server starts correctly

## Contributing

Feel free to open issues or submit pull requests to improve the application.

## License

ISC

