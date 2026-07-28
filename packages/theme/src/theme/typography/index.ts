/**
 * Keys are camelCase (`body1Reading`); the public `variant` name is the
 * kebab-case form of the key (`body1-reading`).
 */
const typography = {
  display1: {
    fontSize: '3.5rem',
    lineHeight: '4.5rem',
    letterSpacing: '-0.0319em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  display2: {
    fontSize: '2.5rem',
    lineHeight: '3.25rem',
    letterSpacing: '-0.0282em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  display3: {
    fontSize: '2.25rem',
    lineHeight: '3rem',
    letterSpacing: '-0.027em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  title1: {
    fontSize: '2rem',
    lineHeight: '2.75rem',
    letterSpacing: '-0.0253em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  title2: {
    fontSize: '1.75rem',
    lineHeight: '2.375rem',
    letterSpacing: '-0.0236em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  title3: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    letterSpacing: '-0.023em',
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  heading1: {
    fontSize: '1.375rem',
    lineHeight: '1.875rem',
    letterSpacing: '-0.0194em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  heading2: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: '-0.012em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  headline1: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    letterSpacing: '-0.002em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  headline2: {
    fontSize: '1.0625rem',
    lineHeight: '1.5rem',
    letterSpacing: '0em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  body1: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.0057em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  body1Reading: {
    fontSize: '1rem',
    lineHeight: '1.625rem',
    letterSpacing: '0.0057em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  body2: {
    fontSize: '0.9375rem',
    lineHeight: '1.375rem',
    letterSpacing: '0.0096em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  body2Reading: {
    fontSize: '0.9375rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.0096em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  label1: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.0145em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  label1Reading: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    letterSpacing: '0.0145em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  label2: {
    fontSize: '0.8125rem',
    lineHeight: '1.125rem',
    letterSpacing: '0.0194em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  caption1: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '0.0252em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
  caption2: {
    fontSize: '0.6875rem',
    lineHeight: '0.875rem',
    letterSpacing: '0.0311em',
    weight: { regular: 400, medium: 500, bold: 600 },
  },
} as const;

export default typography;
