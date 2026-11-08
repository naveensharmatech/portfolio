import { createRoot } from 'react-dom/client';
import { EllaChat } from './RestoredContent.jsx';
import css from './index.css?inline';

// Isolate the assistant from standalone demo, certificate and CV page styles.
if (!document.getElementById('root') && !document.getElementById('ella-widget-host')) {
  const host = document.createElement('div');
  host.id = 'ella-widget-host';
  document.body.append(host);
  const shadow = host.attachShadow({ mode: 'open' });
  const styles = document.createElement('style');
  styles.textContent = css + `
    :host {
      --color-canvas: 246 247 244; --color-surface: 255 255 255;
      --color-ink: 23 35 33; --color-muted: 52 72 63; --color-subtle: 65 84 75;
      --color-panel: 223 232 221; --color-soft: 240 243 239;
      font-family: "Segoe UI", system-ui, sans-serif; font-size: 16px; line-height: 1.6;
      position: fixed; inset: 0 auto auto 0; width: 0; height: 0; z-index: 60;
    }
    @media (prefers-color-scheme: dark) {
      :host { --color-surface: 27 43 37; --color-ink: 241 245 241;
        --color-muted: 201 217 208; --color-panel: 37 59 50; --color-soft: 43 62 53; }
    }
    @media print { :host { display: none !important; } }
  `;
  shadow.append(styles);
  const mount = document.createElement('div');
  shadow.append(mount);
  createRoot(mount).render(<EllaChat />);
}
