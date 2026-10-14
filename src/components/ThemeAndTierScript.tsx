/**
 * Inline script to set data-theme and data-tier attributes on <html> before first paint.
 * Prevents flash of wrong theme or layout shifts on initial load.
 */
export function ThemeAndTierScript() {
  const code = `
    (function() {
      try {
        var t = localStorage.getItem('countersign_theme');
        document.documentElement.dataset.theme = (t === 'light') ? 'light' : 'dark';
        
        var tier = localStorage.getItem('countersign_tier');
        if (tier === 'lite' || tier === 'full') {
          document.documentElement.dataset.tier = tier;
        } else {
          var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          var slow = conn && (conn.saveData || /2g|3g/.test(conn.effectiveType));
          var mem = navigator.deviceMemory && navigator.deviceMemory <= 2;
          var motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          document.documentElement.dataset.tier = (slow || mem || motion) ? 'lite' : 'full';
        }
      } catch (e) {
        document.documentElement.dataset.theme = 'dark';
        document.documentElement.dataset.tier = 'full';
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
