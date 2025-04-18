import dotenv from "dotenv";

dotenv.config();

import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "c7-api/adapters/node";
import expressLayouts from "express-ejs-layouts";

// Setup ES modules dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes from the new routes file
import routes from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.set("layout", "application");
app.use(expressLayouts);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Development request logging middleware
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    if (req.query && Object.keys(req.query).length > 0) {
      console.log(
        `[${new Date().toISOString()}] Query: ${JSON.stringify(
          req.query,
          null,
          2
        )}`
      );
    }
    if (req.body) {
      console.log(
        `[${new Date().toISOString()}] Body: ${JSON.stringify(
          req.body,
          null,
          2
        )}`
      );
    }

    next();
  });
}

// Use the consolidated routes
app.use(routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });
  res.status(500).send("Server Error - Please check logs for details");
});

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
};

// Start the server
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
