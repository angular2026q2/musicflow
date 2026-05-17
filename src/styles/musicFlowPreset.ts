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

        .p-button.recentlyPlayed-menu-button{
          color: var(--color-on-surface-variant);
        }

        .p-button.recentlyPlayed-menu-button:not(:disabled):hover{
          background: transparent;
          color: var(--color-primary)
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
    menu: {
      css: () => `
        .p-menu.recentlyPlayed-menu {
          border: 1px solid var(--color-surface-bright);
          background: rgba(var(--color-surface), 0.6)
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          color: var(--color-on-surface)
        }
        .p-menu.recentlyPlayed-menu .p-menu-item-content {
          color: var(--color-on-surface);
        }
        .p-menu.recentlyPlayed-menu .p-menu-item-content:hover {
            background: transparent;
            color: var(--color-primary)
        }
        `,
    },
  },
});
