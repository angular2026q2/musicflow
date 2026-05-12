/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'no-empty-source': null, // Allow empty CSS files. Temporally rule.
  },
};
