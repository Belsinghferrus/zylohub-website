


/* ================= CONFIG ================= */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6lUN2hxbHRWBO9VhBxPe0P7FtEKZjW2feViVCaLILe_SsojyTR04nAFzyUaSvY45XlA/exec";
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPE = "application/pdf";

/* ================= DOM ================= */
const form = document.getElementById("jobApplicationForm");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");
const spinner = document.getElementById("loadingSpinner");
const successModal = document.getElementById("successModal");

/* ================= INPUT REFERENCES ================= */

const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const referralSource = document.getElementById("referralSource");
const referralNameContainer = document.getElementById("referralNameContainer");
const referralNameInput = document.getElementById("referralName");

/* ================= EVENT ================= */
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🚀 Form submit triggered");

    try {
        toggleLoading(true);

        const payload = await buildPayload();
        console.log("📦 Final payload:", payload);

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("✅ API response:", result);

        if (result.status !== "success") {
            throw new Error(result.message || "Backend rejected submission");
        }

        form.reset();
        openSuccessModal();

    } catch (err) {
        console.error("❌ Submission error:", err);
        alert(err.message || "Something went wrong. Please try again.");
    } finally {
        toggleLoading(false);
    }
});

/* ================= CORE LOGIC ================= */

async function buildPayload() {
    // Required fields
    const fullName = getVal("fullName");
    const email = getVal("email");
    const phone = getVal("phone");
    const position = getVal("position");
    const location = getVal("location");

    if (!fullName || !email || !phone || !position || !location) {
        throw new Error("Please fill all required fields");
    }

    validateEmail(email);
    validatePhone(phone);

    // Resume validation
    const fileInput = document.getElementById("resume");
    const file = fileInput.files[0];

    if (!file) throw new Error("Resume is required");
    validateResume(file);

    const resumeBase64 = await fileToBase64(file);

    return {
        fullName,
        email,
        phone,
        position,
        experience: getVal("experience"),
        location,
        linkedin: getVal("linkedin"),
        github: getVal("github"),
        portfolio: getVal("portfolio"),
        coverLetter: getVal("coverLetter"),
        referralSource: getVal("referralSource"),
        referralName: getVal("referralName"),
        resumeName: file.name,
        resumeBase64
    };
}

/* ================= VALIDATION ================= */


emailInput.addEventListener("input", () => {
    const isValid = emailInput.value.match(/[a-zA-Z0-9._%+-]+@gmail\.com$/);
    if (emailInput.value && !isValid) {
        emailError.classList.remove("hidden");
        emailInput.classList.add("border-red-500");
    } else {
        emailError.classList.add("hidden");
        emailInput.classList.remove("border-red-500");
    }
});

function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      throw new Error("Please use a valid Gmail address");
    }
  }



function validatePhone(phone) {
    const phoneRegex = /^\+91\d{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new Error("Phone number must be in +91XXXXXXXXXX format");
    }
}

emailInput?.addEventListener("blur", () => {
    try {
      validateEmail(emailInput.value.trim());
    } catch (err) {
      alert(err.message);
    }
  });
  
  phoneInput?.addEventListener("blur", () => {
    try {
      validatePhone(phoneInput.value.trim());
    } catch (err) {
      alert(err.message);
    }
  });


function validateResume(file) {
    if (file.type !== ALLOWED_FILE_TYPE) {
        throw new Error("Resume must be a PDF file");
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
        throw new Error("Resume file size must be under 5MB");
    }
}

if (coverLetter) {
    coverLetter.addEventListener("input", () => {
        charCount.textContent = `${coverLetter.value.length}/300`;
    });
}

// Conditional referral name field
/* ================= REFERRAL TOGGLE ================= */

if (referralSource && referralNameContainer && referralNameInput) {
  const syncReferralState = () => {
    const isReferral = referralSource.value === "Referral";

    referralNameContainer.classList.toggle("hidden", !isReferral);
    referralNameInput.required = isReferral;

    if (!isReferral) {
      referralNameInput.value = "";
    }

    console.log("🔁 Referral source:", referralSource.value);
  };

  referralSource.addEventListener("change", syncReferralState);
  syncReferralState(); // ensure correct state on load
}


/* ================= HELPERS ================= */

function toggleLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitText.classList.toggle("hidden", isLoading);
    spinner.classList.toggle("hidden", !isLoading);
    submitBtn.classList.toggle("opacity-70", isLoading);
    submitBtn.classList.toggle("cursor-not-allowed", isLoading);
}

function getVal(id) {
    return document.getElementById(id)?.value.trim() || "";
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/* ================= MODAL ================= */

function openSuccessModal() {
    successModal.classList.remove("hidden");
    successModal.classList.add("flex");
}

function closeSuccessModal() {
    successModal.classList.add("hidden");
    successModal.classList.remove("flex");
}

