// Registration-specific API functions for university, college, and society flows
const BASE = import.meta.env.VITE_API_BASE_URL;

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

/** Send OTP to email for the given role (university | college | society) */
export async function sendRegistrationOTP({ email, role }) {
  return request("/api/v1/register/otp/send", {
    method: "POST",
    body: JSON.stringify({ email, role }),
  });
}

/** Verify OTP */
export async function verifyRegistrationOTP({ email, otp, role }) {
  return request("/api/v1/register/otp/verify", {
    method: "POST",
    body: JSON.stringify({ email, otp, role }),
  });
}

/** Upload logo to Cloudinary — returns { url } */
export async function uploadRegistrationLogo(file) {
  const formData = new FormData();
  formData.append("logo", file);
  const res = await fetch(`${BASE}/api/v1/register/upload-logo`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
}

/** Register university */
export async function registerUniversity(body) {
  return request("/api/v1/register/university", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Register college */
export async function registerCollege(body) {
  return request("/api/v1/register/college", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Register society */
export async function registerSociety(body) {
  return request("/api/v1/register/society", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/* ─── College & University Search (api.data.gov.in) ─────────────────────── */
// api.data.gov.in open data — no API key needed for these endpoints
const COLLEGE_API_KEY = "579b464db66ec23d9960025822";  // public demo key
const COLLEGE_API =
  "https://api.data.gov.in/resource/02b4ef0c-ef34-4c35-8bde-1a9e4b57a33f?api-key=" +
  COLLEGE_API_KEY +
  "&format=json&limit=15&offset=0";
const UNIV_API =
  "https://api.data.gov.in/resource/27fcba5b-9e7c-41a0-a136-02017d0e4af7?api-key=" +
  COLLEGE_API_KEY +
  "&format=json&limit=15&offset=0";

export async function searchIndianColleges(query) {
  try {
    const url = `${COLLEGE_API}&filters[College_Name]=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json().catch(() => null);
    if (!data?.records) return [];
    return data.records.map((r) => r.College_Name || r.college_name || "").filter(Boolean);
  } catch {
    return [];
  }
}

export async function searchIndianUniversities(query) {
  try {
    const url = `${UNIV_API}&filters[University_Name]=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json().catch(() => null);
    if (!data?.records) return [];
    return data.records.map((r) => r.University_Name || r.university_name || "").filter(Boolean);
  } catch {
    return [];
  }
}
