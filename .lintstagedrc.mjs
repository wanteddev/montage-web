export default {
  '*.{ts,tsx,js,mjs}': ['oxlint --fix --fix-suggestions', 'oxfmt'],
  '*.{md,json}': ['oxfmt --no-error-on-unmatched-pattern'],
};
