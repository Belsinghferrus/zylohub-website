
// ========================================
// WAITLIST FORM LOGIC
// ========================================
// waitlist.js



(function () {
    'use strict';
  
    // ⚠️ Replace with your Google Apps Script URL (must support CORS)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAbORYEXCfjW457-vR_olx7aePf-EBwicIIuQ5KDPTNesmgDlLBQwj8-25RxON_DDFYw/exec';
  
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', () => {
      // DOM Elements
      const roleBtns = Array.from(document.querySelectorAll('.role-btn'));
      const firstNameInput = document.getElementById('firstNameInput');
      const lastNameInput = document.getElementById('lastNameInput');
      const emailInput = document.getElementById('emailInput');
      const locationInput = document.getElementById('locationInput');
      const joinBtn = document.getElementById('joinBtn');
      const joinBtnText = document.getElementById('joinBtnText');
      const btnSpinner = document.getElementById('btnSpinner');
      const roleError = document.getElementById('roleError');
      const emailError = document.getElementById('emailError');
      const successMessage = document.getElementById('successMessage');
  
      let selectedRole = null;
  
      // Role selector logic
      function selectRole(btn) {
        roleBtns.forEach(b => {
          b.classList.remove('border-[#FFD02B]', 'scale-[1.01]');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('border-[#FFD02B]', 'scale-[1.01]');
        btn.setAttribute('aria-checked', 'true');
        selectedRole = btn.getAttribute('data-role');
        roleError.classList.add('hidden');
  
        console.log('[role] selected:', selectedRole);
      }
  
      roleBtns.forEach(btn => {
        btn.addEventListener('click', () => selectRole(btn));
        btn.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            selectRole(btn);
          }
        });
      });
  
      // Email validation
      function validateEmail(email) {
        if (!email) return { ok: false, message: 'Please enter your email address.' };
        // strict-ish pattern but safe
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(email)) return { ok: false, message: 'Please enter a valid email address.' };
        const domain = email.split('@')[1]?.toLowerCase();
        if (domain !== 'gmail.com') return { ok: false, message: 'Please use a Gmail address (example@gmail.com).' };
        return { ok: true };
      }
  
      // Form validation
      function validateForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const location = locationInput.value.trim();
  
        // Reset errors
        emailError.classList.add('hidden');
        roleError.classList.add('hidden');
  
        // Validate first name
        if (!firstName) {
          emailError.classList.remove('hidden');
          emailError.textContent = 'Please enter your first name.';
          firstNameInput.focus();
          console.log('[validate] missing first name');
          return false;
        }
  
        // Validate last name
        if (!lastName) {
          emailError.classList.remove('hidden');
          emailError.textContent = 'Please enter your last name.';
          lastNameInput.focus();
          console.log('[validate] missing last name');
          return false;
        }
  
        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.ok) {
          emailError.classList.remove('hidden');
          emailError.textContent = emailValidation.message;
          emailInput.focus();
          console.log('[validate] email invalid:', emailValidation.message);
          return false;
        }
  
        // Validate location
        if (!location) {
          emailError.classList.remove('hidden');
          emailError.textContent = 'Please enter your location.';
          locationInput.focus();
          console.log('[validate] missing location');
          return false;
        }
  
        // Validate role selection
        if (!selectedRole) {
          roleError.classList.remove('hidden');
          roleError.textContent = 'Please select your role (Seeker or Hoster).';
          console.log('[validate] role not selected');
          return false;
        }
  
        console.log('[validate] ok');
        return true;
      }
  
      // Loading state
      function setLoading(loading) {
        joinBtn.disabled = loading;
        if (loading) {
          joinBtn.classList.add('opacity-90', 'cursor-wait');
          joinBtnText.classList.add('opacity-0');
          btnSpinner.classList.remove('hidden');
          firstNameInput.disabled = true;
          lastNameInput.disabled = true;
          emailInput.disabled = true;
          locationInput.disabled = true;
          roleBtns.forEach(b => b.disabled = true);
        } else {
          joinBtn.classList.remove('opacity-90', 'cursor-wait');
          joinBtnText.classList.remove('opacity-0');
          btnSpinner.classList.add('hidden');
          firstNameInput.disabled = false;
          lastNameInput.disabled = false;
          emailInput.disabled = false;
          locationInput.disabled = false;
          roleBtns.forEach(b => b.disabled = false);
        }
      }
  
      // Submit to Google Sheets (or your endpoint)
      async function submitToGoogleSheets(data) {
        console.log('[submit] payload:', data);
  
        try {
          // Use CORS mode — make sure your endpoint allows CORS from your origin
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors', // changed from 'no-cors' so we can observe response
            headers: {
              'Content-Type': 'text/plain;charset=utf-8', 
            },
            body: JSON.stringify(data)
          });
  
          console.log('[network] fetch completed, status:', response.status, 'ok:', response.ok);
          // Attempt to parse JSON if possible
          let json = null;
          try {
            json = await response.json();
            console.log('[network] response JSON:', json);
          } catch (err) {
            console.log('[network] response not JSON or empty (this can happen with certain endpoints):', err);
          }
  
          if (!response.ok) {
            return { success: false, status: response.status, json };
          }
  
          return { success: true, status: response.status, json };
  
        } catch (error) {
          console.error('[network] fetch error:', error);
          return { success: false, error: error.message };
        }
      }
  
      // Main submit handler
      async function handleSubmit() {
        // Hide previous messages
        successMessage.classList.add('hidden');
        emailError.classList.add('hidden');
        roleError.classList.add('hidden');
  
        // Validate form
        if (!validateForm()) {
          return;
        }
  
        // Collect data
        const formData = {
          firstName: firstNameInput.value.trim(),
          lastName: lastNameInput.value.trim(),
          email: emailInput.value.trim(),
          location: locationInput.value.trim(),
          role: selectedRole,
          timestamp: new Date().toISOString()
        };
  
        // Show loading
        setLoading(true);
  
        // Submit to Google Sheets
        const result = await submitToGoogleSheets(formData);
  
        // Minimum loading time for better UX: at least 600ms
        await new Promise(resolve => setTimeout(resolve, 600));
  
        setLoading(false);
  
        if (result.success) {
  
            console.log('[submit] ✅ Success!');
            
            // Hide the old inline success message (if you want to keep it as fallback)
            successMessage.classList.add('hidden');
            
            // Show the modal instead
            showSuccessModal({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              role: selectedRole
            });
          
            // Reset form
            firstNameInput.value = '';
            lastNameInput.value = '';
            emailInput.value = '';
            locationInput.value = '';
            roleBtns.forEach(b => {
              b.classList.remove('border-[#FFD02B]', 'scale-[1.01]');
              b.setAttribute('aria-checked', 'false');
            });
            selectedRole = null;
          
            // Analytics
            if (typeof gtag !== 'undefined') {
              gtag('event', 'waitlist_signup', {
                'user_type': formData.role,
                'location': formData.location
              });
       
          }
          
          // Show success message
          // successMessage.classList.remove('hidden');
          // successMessage.textContent = `✅ You're on the waitlist as a ${selectedRole}! We'll be in touch soon.`;
  
          // console.log('[submit] success');
  
          // Reset form
          firstNameInput.value = '';
          lastNameInput.value = '';
          emailInput.value = '';
          locationInput.value = '';
          roleBtns.forEach(b => {
            b.classList.remove('border-[#FFD02B]', 'scale-[1.01]');
            b.setAttribute('aria-checked', 'false');
          });
          selectedRole = null;
  
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 5000);
  
          // Optional: analytics
          if (typeof gtag !== 'undefined') {
            try {
              gtag('event', 'waitlist_signup', {
                'user_type': formData.role,
                'location': formData.location
              });
            } catch (e) {
              console.log('[analytics] gtag error', e);
            }
          }
  
        } else {
          // Show error
          console.error('[submit] failed result:', result);
          emailError.classList.remove('hidden');
  
          if (result.status) {
            emailError.textContent = `⚠️ Server returned status ${result.status}. Please try again or contact support@zylohub.com`;
          } else if (result.error) {
            emailError.textContent = `⚠️ Network error: ${result.error}. Please try again or contact support@zylohub.com`;
          } else {
            emailError.textContent = '⚠️ Something went wrong. Please try again or contact support@zylohub.com';
          }
        }
      }
  
      // Hook up click
      joinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSubmit();
      });
  
      // Enter key support on inputs
      [firstNameInput, lastNameInput, emailInput, locationInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        });
      });
  
      // For debugging: confirm script loaded
      console.log('Waitlist script initialized.');
    });
  
  
  
  
  
  
    // Add these functions after your existing code
  
  // Show success modal
  function showSuccessModal(userData) {
    console.log('[modal] 🎉 Showing success modal');
    
    // Get modal elements
    const modal = document.getElementById('successModal');
    const card = document.getElementById('successCard');
    const userName = document.getElementById('successUserName');
    const userRole = document.getElementById('successUserRole');
    const userEmail = document.getElementById('successUserEmail');
    
    // Populate user data
    userName.textContent = userData.firstName;
    userRole.textContent = userData.role;
    userEmail.textContent = userData.email;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate card
    setTimeout(() => {
      card.style.transform = 'scale(1)';
      card.style.opacity = '1';
    }, 10);
  }
  
  // Close success modal
  function closeSuccessModal() {
    console.log('[modal] Closing success modal');
    
    const modal = document.getElementById('successModal');
    const card = document.getElementById('successCard');
    
    // Animate out
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0';
    
    setTimeout(() => {
      modal.classList.remove('show');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  // Add click handler for close button
  document.getElementById('closeSuccessModal').addEventListener('click', closeSuccessModal);
  
  // Close on backdrop click
  document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
      closeSuccessModal();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('successModal');
      if (modal.classList.contains('show')) {
        closeSuccessModal();
      }
    }
  });
  
  
  
  })();