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
        .p-card.cover-card {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .p-card.cover-card .p-card-body {
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            flex: 1;
        }

        .p-card.cover-card .discovery-trending__label {
            color: var(--color-on-secondary);
            font-size: var(--text-label);
            line-height: var(--text-body-md);
            text-transform: uppercase;
            padding: var(--space-xs) var(--space-sm);
            background: var(--color-secondary);
            border-radius: var(--radius-default);
            width: fit-content;
            margin-bottom: var(--space-sm);
        }
        .p-card.cover-card .discovery-trending__title {
            color: var(--color-white);
            font-size: var(--text-headline-md);
        }

       .p-card.cover-card .discovery-trending__description {
            font-size: var(--text-body-sm);
            color: var(--color-on-surface-variant);
        }
  `,
    },
  },
});
