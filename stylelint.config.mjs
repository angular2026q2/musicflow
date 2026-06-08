/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'no-empty-source': null, // Allow empty CSS files. Temporally rule.
  },
  overrides: [
    {
      files: ['**/*.scss'],
      rules: {
        // FIX: Allow BEM or kebab-case naming convention for class selectors.
        'selector-class-pattern': [
          '^[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*(?:__[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*)?(?:--[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*)?$',
          {
            message:
              'Expected class selector to be kebab-case or BEM: block, block-name, block__element, block--modifier, block__element--modifier',
          },
        ],
      },
    },
  ],
};
