/**
 * 모바일 문서 frontmatter의 백틱은 YAML 파싱을 깨뜨리므로 제거한다
 * 문서 생성과 docs 유효성 검증(.github/actions/validate-docs)이 함께 사용한다
 */
export const normalizeFrontmatter = (content: string) =>
  content.replace(/^(---\n[\s\S]*?\n---)/, (frontmatter) =>
    frontmatter.replace(/`/g, ''),
  );
