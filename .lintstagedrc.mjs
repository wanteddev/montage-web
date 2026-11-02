export default {
  '*.{ts,tsx,js,mjs}': ['oxlint --fix', 'oxfmt'],
  '*.{md,json}': ['oxfmt --no-error-on-unmatched-pattern'],
};
