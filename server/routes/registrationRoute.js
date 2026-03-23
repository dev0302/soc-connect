const express = require("express");
const {
  sendRegistrationOTP,
  verifyRegistrationOTP,
  uploadLogo,
  registerUniversity,
  registerCollege,
  registerSociety,
} = require("../controllers/registrationController");

const {
  searchIndianUniversities,
  searchIndianColleges,
} = require("../controllers/registrationSearchController");

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

// Search endpoints (proxy for api.data.gov.in so the browser avoids CORS).
router.get("/search/universities", searchIndianUniversities);
router.get("/search/colleges", searchIndianColleges);

module.exports = router;
