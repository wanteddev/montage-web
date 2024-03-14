const reset = `
/* reset css */
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
button {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

html,
body {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  font-family:
    Pretendard,
    'Pretendard JP',
    'Pretendard Std',
    -apple-system,
    system-ui,
    BlinkMacSystemFont,
    Roboto,
    'Segoe UI',
    Helvetica,
    Arial,
    'Apple SD Gothic Neo',
    'Nanum Gothic',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
}

svg {
  width: 1em;
  height: 1em;
}

html:lang(ja) body {
  font-family:
    'Pretendard JP',
    Pretendard,
    'Pretendard Std',
    -apple-system,
    system-ui,
    BlinkMacSystemFont,
    Roboto,
    'Segoe UI',
    Helvetica,
    Arial,
    'Apple SD Gothic Neo',
    'Nanum Gothic',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
}

html:lang(en) body {
  font-family:
    'Pretendard Std',
    Pretendard,
    'Pretendard JP',
    -apple-system,
    system-ui,
    BlinkMacSystemFont,
    Roboto,
    'Segoe UI',
    Helvetica,
    Arial,
    'Apple SD Gothic Neo',
    'Nanum Gothic',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
}

textarea {
  font-family:
    Pretendard,
    'Pretendard JP',
    'Pretendard Std',
    -apple-system,
    system-ui,
    BlinkMacSystemFont,
    Roboto,
    'Segoe UI',
    Helvetica,
    Arial,
    'Apple SD Gothic Neo',
    'Nanum Gothic',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

a,
button {
  cursor: pointer;
}

*,
*::after,
*::before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
`;

export default reset;
