(function() {
    'use strict';
  
    const COOKIE_NAME = 'zylohub_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
  
    // Get cookie value
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        console.log('[cookies] Found cookie:', name, '=', cookieValue);
        return cookieValue;
      }
      console.log('[cookies] No cookie found for:', name);
      return null;
    }
  
    // Set cookie
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      
      // Set cookie with proper attributes
      document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
      
      console.log('[cookies] Cookie set:', name, '=', value);
      console.log('[cookies] Full cookie string:', document.cookie);
      
      // Verify it was set
      setTimeout(() => {
        const verify = getCookie(name);
        if (verify === value) {
          console.log('[cookies] ✅ Cookie verified');
        } else {
          console.error('[cookies] ❌ Cookie verification failed!');
        }
      }, 100);
    }
  
    // Show banner
    function showBanner() {
      const banner = document.getElementById('cookieConsent');
      if (!banner) {
        console.error('[cookies] ❌ Banner element not found!');
        return;
      }
  
      console.log('[cookies] 🍪 Showing banner');
      
      // Remove hide class if present
      banner.classList.remove('hide');
      banner.style.display = 'block';
      
      // Show with animation
      setTimeout(() => {
        banner.classList.add('show', 'animate');
      }, 1000);
    }
  
    // Hide banner
    function hideBanner() {
      const banner = document.getElementById('cookieConsent');
      if (!banner) return;
  
      console.log('[cookies] Hiding banner');
      
      // Remove show classes
      banner.classList.remove('show', 'animate');
      banner.classList.add('hide');
      
      // Hide after animation
      setTimeout(() => {
        banner.style.display = 'none';
        console.log('[cookies] ✅ Banner hidden');
      }, 400);
    }
  
    // Handle accept
    function handleAccept() {
      console.log('[cookies] User clicked ACCEPT');
      
      // Set cookie
      setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
      
      // Hide banner
      hideBanner();
      
      // Enable tracking
      initializeTracking();
    }
  
    // Handle reject
    function handleReject() {
      console.log('[cookies] User clicked REJECT');
      
      // Set cookie
      setCookie(COOKIE_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
      
      // Hide banner
      hideBanner();
      
      // Disable tracking
      disableTracking();
    }
  
    // Initialize tracking
    function initializeTracking() {
      console.log('[cookies] ✅ Tracking enabled');
      
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('consent', 'grant');
      }
    }
  
    // Disable tracking
    function disableTracking() {
      console.log('[cookies] ❌ Tracking disabled');
      
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('consent', 'revoke');
      }
    }
  
    // Initialize
    function init() {
      console.log('[cookies] ═══ Initializing Cookie Consent ═══');
      console.log('[cookies] Current cookies:', document.cookie);
      
      const consent = getCookie(COOKIE_NAME);
      console.log('[cookies] Consent status:', consent || 'NONE');
  
      if (!consent) {
        // No consent yet - show banner
        console.log('[cookies] No consent found, showing banner');
        showBanner();
      } else if (consent === 'accepted') {
        // Already accepted
        console.log('[cookies] ✅ Previously accepted');
        initializeTracking();
        
        // Make sure banner is hidden
        const banner = document.getElementById('cookieConsent');
        if (banner) {
          banner.style.display = 'none';
        }
      } else if (consent === 'rejected') {
        // Already rejected
        console.log('[cookies] ❌ Previously rejected');
        disableTracking();
        
        // Make sure banner is hidden
        const banner = document.getElementById('cookieConsent');
        if (banner) {
          banner.style.display = 'none';
        }
      }
  
      // Event listeners
      const acceptBtn = document.getElementById('cookieAccept');
      const rejectBtn = document.getElementById('cookieReject');
  
      if (acceptBtn) {
        acceptBtn.addEventListener('click', handleAccept);
        console.log('[cookies] Accept button found');
      } else {
        console.error('[cookies] ❌ Accept button NOT found!');
      }
  
      if (rejectBtn) {
        rejectBtn.addEventListener('click', handleReject);
        console.log('[cookies] Reject button found');
      } else {
        console.error('[cookies] ❌ Reject button NOT found!');
      }
    }
  
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    // Testing functions
    window.checkCookieConsent = function() {
      console.log('Current cookies:', document.cookie);
      console.log('Consent cookie:', getCookie(COOKIE_NAME));
    };
  
    window.resetCookieConsent = function() {
      console.log('[cookies] Resetting consent...');
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      console.log('[cookies] ✅ Reset complete!');
      console.log('[cookies] Reloading page...');
      setTimeout(() => location.reload(), 500);
    };
  
    console.log('═════════════════════════════════════════');
    console.log('🍪 Cookie Consent Script Loaded');
    console.log('💡 Debug commands:');
    console.log('   checkCookieConsent()  - Check current status');
    console.log('   resetCookieConsent()  - Reset and test again');
    console.log('═════════════════════════════════════════');
  
  })();
  