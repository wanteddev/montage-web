/**
 * 모바일 문서 frontmatter의 백틱은 YAML 파싱을 깨뜨리므로 제거한다
 * .github/actions/validate-docs/src/index.ts에 같은 코드가 있으므로 함께 수정한다
 */
export const normalizeFrontmatter = (content: string) =>
  content.replace(/^(---\n[\s\S]*?\n---)/, (frontmatter) =>
    frontmatter.replace(/`/g, ''),
  );
