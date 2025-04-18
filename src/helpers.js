import axios from "axios";

// Authorization middleware for non-API routes
// https://developer.commerce7.com/docs/authenticate-app
export const authorizeUser = async (req, res, next) => {
  // Skip authorization in development environment
  if (process.env.NODE_ENV === "development") {
    console.log("Authentication bypassed in development mode");
    return next();
  }

  const { appToken, account, tenantId } = req.query;

  // Check if required parameters are present
  if ((!appToken && !account) || !tenantId) {
    return res.status(401).render("401");
  }

  try {
    // Prepare authorization header
    const authHeader = appToken || account;

    // Make a request to Commerce7 API to validate user using axios
    const response = await axios({
      method: "GET",
      url: "https://api.commerce7.com/account/user",
      headers: {
        Authorization: authHeader,
        tenant: tenantId,
      },
    });

    // If the request succeeds, user is authorized
    req.user = response.data;
    next();
  } catch (error) {
    console.error("Authorization failed:", error.message);
    return res.status(401).render("401");
  }
};

// Basic authentication middleware for /app/install endpoint
export const basicAuth = (req, res, next) => {
  // Get authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).render("401");
  }

  // Decode the Base64 credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");

  // Check against environment variables
  if (
    username === process.env.COMMERCE7_USERNAME &&
    password === process.env.COMMERCE7_PASSWORD
  ) {
    next(); // Authentication successful
  } else {
    res.status(401).render("401");
  }
};
