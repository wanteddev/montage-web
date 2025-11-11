import type { PhrasingContentMap as BasePhrasingContentMap } from 'mdast';
import type { MDXJSXTextElement } from 'mdast-util-mdx-jsx';

declare module 'mdast' {
  interface PhrasingContentMap extends BasePhrasingContentMap {
    // Allow using MDX JSX (text) nodes defined by `remark-mdx`.
    mdxJsxTextElement: MDXJSXTextElement;
  }
}
