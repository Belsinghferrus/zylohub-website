(function () {
    'use strict';

    const BANNER_DELAY = 30000; // 30 seconds
    const BANNER_SHOWN_KEY = 'zylohub_banner_shown';
    const COOKIE_NAME = 'zylohub_cookie_consent';

    // Get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop().split(';').shift();
            console.log('[banner] Found cookie:', name, '=', cookieValue);
            return cookieValue;
        }
        return null;
    }

    // Check if cookie consent is accepted or rejected
    function isCookieConsentGiven() {
        const consent = getCookie(COOKIE_NAME);

        if (consent === 'accepted') {
            console.log('[banner] ✅ Cookie accepted - show banner');
            return true;
        } else if (consent === 'rejected') {
            console.log('[banner] ❌ Cookie rejected - show banner');
            return true;
        } else {
            console.log('[banner] ⏳ No cookie consent yet - hide banner');
            return false;
        }
    }

    // Show banner
    function showBanner() {
        if (localStorage.getItem(BANNER_SHOWN_KEY) === 'true') {
            console.log('[banner] Already shown, skipping');
            return;
        }

        const banner = document.getElementById('waitlistBanner');
        if (!banner) {
            console.error('[banner] Banner element not found!');
            return;
        }

        banner.classList.add('show');
        localStorage.setItem(BANNER_SHOWN_KEY, 'true');
        console.log('[banner] 🟡 Yellow banner shown');
    }

    // Close banner
    function closeBanner() {
        const banner = document.getElementById('waitlistBanner');
        banner.classList.remove('show');
        console.log('[banner] Closed');
    }

    // Open form modal
    function openBannerForm() {
        const overlay = document.getElementById('bannerFormOverlay');
        const card = document.getElementById('bannerFormCard');
        const existingForm = document.querySelector('#waitlist .bg-\\[\\#0a0a0a\\]')?.innerHTML;

        console.log('[banner] Opening form');

        if (existingForm) {
            document.getElementById('bannerFormContent').innerHTML = existingForm;
        }

        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, 10);
    }

    // Close form modal
    function closeBannerForm() {
        const overlay = document.getElementById('bannerFormOverlay');
        const card = document.getElementById('bannerFormCard');

        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';

        setTimeout(() => {
            overlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Initialize
    function init() {
        console.log('[banner] ════════════════════════════════');
        console.log('[banner] Checking cookie consent...');

        // ⚠️ ONLY show banner if cookie is accepted or rejected
        if (!isCookieConsentGiven()) {
            console.log('[banner] ⛔ Banner BLOCKED - User has not given cookie consent yet');
            console.log('[banner] Banner will show after user accepts/rejects cookies');
            return; // Don't show banner
        }

        console.log('[banner] ✅ Cookie consent given - Banner will show in 30 seconds');
        console.log('[banner] ════════════════════════════════');

        // Show banner after 30 seconds
        setTimeout(showBanner, BANNER_DELAY);

        // Event listeners
        document.getElementById('closeBannerBtn')?.addEventListener('click', closeBanner);
        document.getElementById('openBannerForm')?.addEventListener('click', openBannerForm);
        document.getElementById('closeBannerFormBtn')?.addEventListener('click', closeBannerForm);

        document.getElementById('bannerFormOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'bannerFormOverlay') {
                closeBannerForm();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('bannerFormOverlay');
                if (overlay?.classList.contains('show')) {
                    closeBannerForm();
                }
            }
        });

        // Debug functions
        window.resetBanner = function () {
            localStorage.removeItem(BANNER_SHOWN_KEY);
            console.log('[banner] ✅ Banner reset! Reload page to test.');
            location.reload();
        };

        window.checkBannerStatus = function () {
            console.log('Cookie consent:', getCookie(COOKIE_NAME));
            console.log('Banner shown before:', localStorage.getItem(BANNER_SHOWN_KEY));
            console.log('Can show banner:', isCookieConsentGiven());
        };

        console.log('💡 Debug commands:');
        console.log('   checkBannerStatus() - Check current status');
        console.log('   resetBanner() - Reset and test again');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
