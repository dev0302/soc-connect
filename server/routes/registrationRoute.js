const express = require("express");
const {
  sendRegistrationOTP,
  verifyRegistrationOTP,
  uploadLogo,
  registerUniversity,
  registerCollege,
  registerSociety,
} = require("../controllers/registrationController");

const router = express.Router();

// OTP
router.post("/otp/send", sendRegistrationOTP);
router.post("/otp/verify", verifyRegistrationOTP);

// Logo upload (Cloudinary)
router.post("/upload-logo", uploadLogo);

// Role registrations
router.post("/university", registerUniversity);
router.post("/college", registerCollege);
router.post("/society", registerSociety);

module.exports = router;
