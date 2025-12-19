import '@wanteddev/wds/theme.css';
import '@wanteddev/wds/reset.css';

// Disable hover states for visual regression tests by moving mouse to corner
if (typeof document !== 'undefined') {
  // Add CSS to prevent hover states from being applied
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent hover states in visual tests */
    *,
    *::before,
    *::after {
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
}
