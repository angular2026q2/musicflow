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
      },
    },
  ],
};
