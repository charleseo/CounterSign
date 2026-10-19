/**
 * Inline script to set data-theme and data-tier attributes on <html> before first paint.
 * Prevents flash of wrong theme or layout shifts on initial load.
 * Default is light theme.
 */
export function ThemeAndTierScript() {
  const code = `
    (function() {
      try {
        var t = localStorage.getItem('tracebase_theme') || localStorage.getItem('countersign_theme');
        var isDark = t === 'dark';
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', isDark);
        
        var tier = localStorage.getItem('tracebase_tier') || localStorage.getItem('countersign_tier');
        if (tier === 'lite' || tier === 'full' || tier === 'basic') {
          document.documentElement.dataset.tier = tier;
        } else {
          var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          var slow = conn && (conn.saveData || /2g|3g/.test(conn.effectiveType));
          var slow2g = conn && conn.effectiveType === 'slow-2g';
          var mem = navigator.deviceMemory && navigator.deviceMemory <= 2;
          var motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (slow2g) {
            document.documentElement.dataset.tier = 'basic';
          } else if (slow || mem || motion) {
            document.documentElement.dataset.tier = 'lite';
          } else {
            document.documentElement.dataset.tier = 'full';
          }
        }
      } catch (e) {
        document.documentElement.dataset.theme = 'light';
        document.documentElement.dataset.tier = 'full';
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
