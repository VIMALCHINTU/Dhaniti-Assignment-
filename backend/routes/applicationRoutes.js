const express = require("express");

const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus
} = require("../controllers/applicationController");

const router = express.Router();

// Get all applications
router.get("/", getApplications);

// Get one application
router.get("/:id", getApplicationById);

// Create new application
router.post("/", createApplication);

// Update application status
router.patch("/:id/status", updateApplicationStatus);

module.exports = router;