/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'no-empty-source': null, // Allow empty CSS files. Temporally rule.
  },
  overrides: [
    {
      files: ['**/*.scss'],
      rules: {
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['ng-deep'],
          },
        ],

        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['use', 'forward', 'mixin', 'include'],
          },
        ],

        'media-query-no-invalid': null,

        // FIX: Allow double slash comments in SCSS.
        'no-invalid-double-slash-comments': null,
        'scss/comment-no-loud': null,

        // FIX: Allow BEM or kebab-case naming convention for class selectors.
        'selector-class-pattern': [
          '^([a-z][a-z0-9]*)([__-][a-z0-9]+)*$',
          {
            message: 'Use BEM or kebab-case naming convention',
          },
        ],
      },
    },
  ],
};
