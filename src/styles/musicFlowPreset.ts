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
      colorScheme: {
        dark: {
          root: {
            primary: {
              color: 'var(--color-surface)',
              hoverColor: 'var(--color-on-primary)',
              background: 'var(--color-white)',
              hoverBackground: 'var(--color-white)',
              hoverBorderColor: 'var(--color-white)',
            },
          },
        },
      },
      css: () => `
        .p-button.dropdown-menu-button{
          color: var(--color-on-surface-variant);
        }

        .p-button.dropdown-menu-button:not(:disabled):hover{
          background: transparent;
          color: var(--color-primary)
        }
        .p-button.dropdown-menu-button--bordered {
          border: 1px solid var(--color-surface-bright);
          border-radius: 50%;
        }

        .p-button.dropdown-menu-button--bordered:not(:disabled):hover {
          background: transparent;
          color: var(--color-primary);
        }
        
        .p-button.p-button-text.modal-close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--space-xl);
          height: var(--space-xl);
          border: none;
          border-radius: var(--radius-full);
          color: var(--color-outline);
          background: none;
          transition: color 0.2s ease, background-color 0.2s ease;
        }
        
        @media (hover: hover) and (pointer: fine) {
          .p-button.p-button-text.modal-close-button:not(:disabled):hover {
            color: var(--color-on-surface);
            background-color: var(--color-surface-container);
          }
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
            padding: var(--space-lg);
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
            font-family: var(--font-display);
        }

       .p-card.cover-card .discovery-trending__description {
            font-size: var(--text-body-sm);
            color: var(--color-on-surface-variant);
        }
  `,
    },
    menu: {
      css: () => `
        .p-menu.dropdown-menu {
          border: 1px solid var(--color-surface-bright);
          background: rgba(var(--color-surface), 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          color: var(--color-on-surface)
        }

        .p-menu.dropdown-menu .p-menu-item-content {
          color: var(--color-on-surface);
        }

        .p-menu.dropdown-menu .p-menu-item-icon {
        color: var(--color-on-surface);
        }

        .p-menu.dropdown-menu .p-menu-item-content:hover {
        background: transparent;
        color: var(--color-primary);
        }

        .p-menu.dropdown-menu .p-menu-item-content:hover .p-menu-item-icon {
        color: var(--color-primary);
        }
        `,
    },
  },
  css: () => `
  .form-field--fluid .p-iconfield {
    display: flex;
    width: 100%;
  }

  .form-field--fluid .p-iconfield > * {
    width: 100%;
  }
  
  .form-field--fluid p-password input {
    padding-left: var(--space-xxl);
  }

  .form-field--fluid .p-password,
  .form-field--fluid .p-password .p-inputtext,
  .form-field--fluid input,
  .form-field--fluid .p-inputtext {
    width: 100%;
  }
`,
});
