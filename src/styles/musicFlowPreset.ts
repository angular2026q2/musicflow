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
    slider: {
      track: {
        background: 'var(--color-surface-highest)',
      },
      range: {
        background: 'var(--color-on-surface-variant)',
      },
      handle: {
        width: '4px',
        height: '4px',
        background: 'transparent',

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
  },
});
