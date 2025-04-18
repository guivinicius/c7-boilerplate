# Commerce7 Boilerplate

A server-side rendered application using Express.js with EJS templates over HTTPS, designed to integrate with Commerce7's API.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd c7-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Environment Variables:
   - Copy the `.env.example` file to create a new `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file and fill in your specific environment variables.

4. SSL Certificates:
   - The app uses HTTPS. Make sure you have SSL certificates in the `certs` folder:
     - `cert.pem`: Your SSL certificate
     - `key.pem`: Your SSL private key

## Development

Start the development server:
```bash
npm run dev
```

The server will run on the port specified in your `.env` file (default: 3000).

## Available Scripts

- `npm start`: Starts the production server
- `npm run dev`: Starts the development server with hot reloading
- `npm test`: Runs the test suite

## Environment Variables

This project uses `dotenv` to manage environment variables. Here are the variables used:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | The port the server will run on | 3000 |
| NODE_ENV | Environment mode (development, production) | development |
| COMMERCE7_TENANT_ID | Your Commerce7 tenant ID | - |
| COMMERCE7_CLIENT_ID | Your Commerce7 client ID | - |
| COMMERCE7_CLIENT_SECRET | Your Commerce7 client secret | - |
| COMMERCE7_USERNAME | Username for basic auth on installation | - |
| COMMERCE7_PASSWORD | Password for basic auth on installation | - |

## Project Structure

```
c7-boilerplate/
├── certs/                # SSL certificates for HTTPS
│   ├── cert.pem          # Certificate file
│   └── key.pem           # Private key file
├── public/               # Static assets
│   └── styles.css        # CSS styles
├── src/                  # Source code
│   ├── helpers.js        # Helper functions (auth middleware)
│   ├── routes.js         # Express routes
│   └── views/            # EJS templates
│       ├── 401.ejs       # Unauthorized page
│       ├── application.ejs # Main layout template
│       ├── index.ejs     # Homepage template
│       └── products.ejs  # Products display template
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Example environment variables file
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── server.js             # Main application entry point
```

## Features

- **HTTPS Support**: Secure connection using SSL certificates
- **EJS Templating**: Server-side rendering with EJS templates
- **Commerce7 Integration**: Built-in integration with Commerce7's API
- **Authentication Middleware**: 
  - `authorizeUser`: Verifies user authentication with Commerce7 using app tokens
  - `basicAuth`: Basic authentication for app installation endpoint
- **Development Mode**: Enhanced logging and authentication bypass for easier development

## Authentication

The application uses two authentication mechanisms:

1. **User Authorization**: For customer-facing routes, using Commerce7 app tokens or account tokens
2. **Basic Authentication**: For protected admin routes (like app installation), using HTTP Basic Auth

In development mode (`NODE_ENV=development`), authentication checks are bypassed for easier testing.

## API Endpoints

- `GET /`: Main application homepage
- `GET /products`: Display products from Commerce7
- `POST /app/install`: Handle app installation (Basic Auth protected)
- `POST /app/uninstall`: Handle app uninstallation
- `POST /app/webhook`: Process webhook events from Commerce7

## Dependencies

- **Express.js**: Web server framework
- **EJS**: Templating engine
- **c7-api**: Official Commerce7 API client
- **dotenv**: Environment variable management
- **axios**: HTTP client for API requests
- **express-ejs-layouts**: Layout support for EJS
- **nodemon**: Development auto-restart utility

## License

ISC

## Author

Guilherme Vinicius Moreira