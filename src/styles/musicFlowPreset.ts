import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MusicFlowPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        primary: {
          color: 'var(--color-on-surface-variant)',
          background: 'var(--color-surface-variant)',
        },
      },
    },
  },
  components: {
    button: {
      css: () => `
        .p-button.control-button {
          padding: var(--space-xs);
        }

        .p-button.control-button:not(:disabled):hover {
          color: var(--color-secondary);
          background: transparent;
        }

        .p-button.control-button--active {
          color: var(--color-secondary);
        }
      `,
    },
    slider: {
      css: () => `
        .p-slider .p-slider-handle {
          background: transparent;
          border: none;
          box-shadow: none;
        }
        .p-slider .p-slider-handle::before {
          background: transparent;
          box-shadow: none;
        }
        
        .timestep .p-slider-range {
          background: var(--color-secondary);
        }
      `,
      track: {
        background: 'var(--color-surface-highest)',
      },
      range: {
        background: 'var(--color-on-surface-variant)',
      },
      handle: {
        background: 'transparent',
        hoverBackground: 'transparent',

        content: {
          background: 'transparent',
          hoverBackground: 'transparent',
          height: '12px',
          width: '12px',
        },

        focusRing: {
          width: '0px',
        },
      },
    },
    card: {
      css: () => `
      .p-card.small-card {
        background: color-mix(in srgb, var(--color-player-background) 60%, transparent);
        border: 1px solid color-mix(in srgb, var(--color-white) 10%, transparent);
        backdrop-filter: blur(12px);
        border-radius: var(--space-gutter);
        max-width: 222px;
    }
  `,
    },
  },
});
