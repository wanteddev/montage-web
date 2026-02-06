import { DOCS_PAGES, PLATFORM_PATTERN_WITHOUT_DESIGN } from '../constants';

import type { Frontmatter, GroupedPages } from '../types';

export const isFrontmatter = (
  item: Frontmatter | Record<string, Array<Frontmatter>>,
): item is Frontmatter => {
  return 'title' in item;
};

export const hasMatchingDevelopPlatformPage = (
  slug: Array<string>,
  allFrontmatter: Array<Frontmatter>,
) => {
  const lastSegment = slug.at(-1);

  if (!lastSegment?.match(PLATFORM_PATTERN_WITHOUT_DESIGN)) {
    return false;
  }

  const designSlug = [...slug.slice(0, -1), 'design'].toString();
  const hasDesign = allFrontmatter.some(
    (frontmatter) => frontmatter.originSlug.toString() === designSlug,
  );

  if (lastSegment !== 'design' && hasDesign) {
    return true;
  }

  const webSlug = [...slug.slice(0, -1), 'web'].toString();
  const hasWeb = allFrontmatter.some(
    (frontmatter) => frontmatter.originSlug.toString() === webSlug,
  );

  if (lastSegment !== 'web' && hasWeb) {
    return true;
  }

  return false;
};

export const parseGroupedPages = (
  frontmatters: Array<Frontmatter>,
): GroupedPages => {
  const grouped: GroupedPages = {};

  frontmatters.forEach((frontmatter) => {
    if (frontmatter.slug.length === 0) return;

    const [firstSlug, ...restSlugs] = frontmatter.slug;

    if (!firstSlug) return;

    if (!grouped[firstSlug]) {
      grouped[firstSlug] = [];
    }

    // slug가 1개인 경우 (최상위 페이지)
    if (restSlugs.length === 0) {
      grouped[firstSlug]!.push(frontmatter);
      return;
    }

    // slug가 2개 이상인 경우 (중첩된 그룹)
    const [secondSlug, thirdSlug] = restSlugs;

    if (!secondSlug) {
      return;
    }

    if (!thirdSlug) {
      grouped[firstSlug]!.push(frontmatter);
      return;
    }

    // 두 번째 레벨 그룹 찾기 또는 생성
    let secondLevelGroup = grouped[firstSlug]!.find(
      (
        item: Frontmatter | Record<string, Array<Frontmatter>>,
      ): item is Record<string, Array<Frontmatter>> =>
        typeof item === 'object' && !('title' in item) && secondSlug in item,
    );

    if (!secondLevelGroup) {
      secondLevelGroup = { [secondSlug]: [] };
      grouped[firstSlug]!.push(secondLevelGroup);
    }

    // 두 번째 레벨에 페이지 추가
    if (!secondLevelGroup[secondSlug]) {
      secondLevelGroup[secondSlug] = [];
    }

    if (hasMatchingDevelopPlatformPage(frontmatter.originSlug, frontmatters)) {
      return;
    }

    secondLevelGroup[secondSlug]!.push(frontmatter);
  });

  DOCS_PAGES.forEach((page) => {
    if (page.slug.length === 0) return;

    const [firstSlug, ...restSlugs] = page.slug;

    if (!firstSlug) return;

    if (!grouped[firstSlug]) {
      grouped[firstSlug] = [];
    }

    const pageFrontmatter: Frontmatter = {
      title: page.title,
      slug: page.slug,
      originSlug: page.slug,
      url: page.url,
      isExternal: page.isExternal,
    };

    // slug가 1개인 경우 (최상위 페이지)
    if (restSlugs.length === 0) {
      grouped[firstSlug]!.push(pageFrontmatter);
      return;
    }

    // slug가 2개 이상인 경우 (중첩된 그룹)
    const [secondSlug, thirdSlug] = restSlugs;

    if (!secondSlug) {
      return;
    }

    if (!thirdSlug) {
      grouped[firstSlug]!.push(pageFrontmatter);
      return;
    }

    // 두 번째 레벨 그룹 찾기 또는 생성
    let secondLevelGroup = grouped[firstSlug]!.find(
      (
        item: Frontmatter | Record<string, Array<Frontmatter>>,
      ): item is Record<string, Array<Frontmatter>> =>
        typeof item === 'object' && !('title' in item) && secondSlug in item,
    );

    if (!secondLevelGroup) {
      secondLevelGroup = { [secondSlug]: [] };
      grouped[firstSlug]!.push(secondLevelGroup);
    }

    // 두 번째 레벨에 페이지 추가
    if (!secondLevelGroup[secondSlug]) {
      secondLevelGroup[secondSlug] = [];
    }

    secondLevelGroup[secondSlug]!.push(pageFrontmatter);
  });

  // 각 그룹 정렬
  Object.keys(grouped).forEach((key) => {
    const group = grouped[key];
    if (!group) return;

    group.sort((a, b) => {
      // Frontmatter가 먼저 오도록
      const aIsFrontmatter = isFrontmatter(a);
      const bIsFrontmatter = isFrontmatter(b);

      if (aIsFrontmatter && !bIsFrontmatter) return -1;
      if (!aIsFrontmatter && bIsFrontmatter) return 1;

      // 둘 다 Frontmatter인 경우 title로 정렬
      if (aIsFrontmatter && bIsFrontmatter) {
        return a.title.localeCompare(b.title);
      }

      // 둘 다 Record인 경우 web, ios, android 우선 정렬 후 나머지 정렬
      const aKey = Object.keys(a)[0] || '';
      const bKey = Object.keys(b)[0] || '';
      const order = ['web', 'ios', 'android'];

      const aIndex = order.indexOf(aKey.match(/^(web|ios|android)/)?.[0] ?? '');
      const bIndex = order.indexOf(bKey.match(/^(web|ios|android)/)?.[0] ?? '');

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return aKey.localeCompare(bKey);
    });

    // 두 번째 레벨 그룹 정렬 (Record 내부 배열)
    group.forEach((item) => {
      if (!isFrontmatter(item)) {
        Object.keys(item).forEach((secondKey) => {
          const secondLevelArray = item[secondKey];
          if (secondLevelArray) {
            secondLevelArray.sort((a, b) => a.title.localeCompare(b.title));
          }
        });
      }
    });
  });

  return grouped;
};
