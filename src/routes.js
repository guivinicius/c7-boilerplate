import express from "express";
import { authorizeUser, basicAuth } from "./helpers.js";
import { Commerce7 } from "c7-api";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Initialize C7API client
const c7Client = new Commerce7({
  tenantId: process.env.COMMERCE7_TENANT_ID,
  clientId: process.env.COMMERCE7_CLIENT_ID,
  clientSecret: process.env.COMMERCE7_CLIENT_SECRET,
});

router.get("/products", authorizeUser, async (req, res) => {
  const productsResponse = await c7Client.products.list();

  res.render("products", {
    products: productsResponse.products,
  });
});

// API routes
router.post("/app/install", basicAuth, (req, res) => {
  try {
    // Handle installation logic here
    console.log("Installation request received:", req.body);

    // For now, just return a success response
    res.status(200).json({
      success: true,
      message: "App installed successfully",
    });
  } catch (error) {
    console.error("Installation error:", error);
    res.status(500).json({
      success: false,
      message: "Installation failed",
      error: error.message,
    });
  }
});

router.post("/app/uninstall", (req, res) => {
  try {
    // Handle uninstallation logic here
    console.log("Uninstallation request received:", req.body);

    // For now, just return a success response
    res.status(200).json({
      success: true,
      message: "App uninstalled successfully",
    });
  } catch (error) {
    console.error("Uninstallation error:", error);
    res.status(500).json({
      success: false,
      message: "Uninstallation failed",
      error: error.message,
    });
  }
});

router.post("/app/webhook", (req, res) => {
  try {
    // Handle webhook logic here
    console.log("Webhook event received:", req.body);

    // For now, just return a success response
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({
      success: false,
      message: "Webhook processing failed",
      error: error.message,
    });
  }
});

router.get("/", authorizeUser, (req, res) => {
  res.render("index");
});

export default router;
