import path from 'node:path';
import fs from 'node:fs';

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { IncomingWebhook } from '@slack/webhook';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const SUPPORTS_PROJECTS = [
  {
    name: 'dashboard-web',
    path: 'src',
    alias: '대시보드',
  },
  {
    name: 'userweb',
    path: 'src',
    alias: '유저웹',
  },
  {
    name: 'wanted-frontend',
    path: 'apps/social/src',
    alias: '소셜',
  },
  {
    name: 'wanted-one-frontend',
    path: 'apps/one-company/src',
    alias: '통합기업',
  },
  {
    name: 'wanted-one-frontend',
    path: 'apps/one-company-admin/src',
    alias: '통합기업어드민',
  },
  {
    name: 'wanted-one-frontend',
    path: 'apps/square/src',
    alias: '스퀘어',
  },
  {
    name: 'wanted-one-frontend',
    path: 'apps/wantedspace-admin/src',
    alias: '원티드스페이스어드민',
  },
  {
    name: 'wantedspace-front',
    path: 'apps/front/src',
    alias: '원티드스페이스',
  },
  {
    name: 'wantedspace-front',
    path: 'apps/dashboard/src',
    alias: '원티드스페이스 대시보드',
  },
  {
    name: 'event-front',
    path: 'src',
    alias: '이벤트',
  },
  {
    name: 'eas-dashboard',
    path: 'src',
    alias: 'EAS 대시보드',
  },
  {
    name: 'gigs-frontend',
    path: null,
    alias: '긱스',
  },
  {
    name: 'endgame',
    path: 'src',
    alias: 'endgame',
  },
  {
    name: 'kreditjob-dashboard-front',
    path: 'src',
    alias: '크레딧잡 대시보드',
  },
];

const run = async () => {
  const webhookUrl = core.getInput('webhook_url', { required: true });
  const ghToken = core.getInput('gh_token', { required: true });

  const cloneRepository = async (name: string) => {
    if (fs.existsSync(name)) {
      return;
    }

    core.info(`Cloning ${name}...`);
    await exec.exec(
      `git clone https://wantedFE:${ghToken}@github.com/wanteddev/${name}.git --single-branch`,
    );
  };

  // Clone repositories
  for (const project of SUPPORTS_PROJECTS) {
    await cloneRepository(project.name);
  }

  const getAllFiles = (dir: string): Array<string> => {
    const files: Array<string> = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }

    return files;
  };

  const parseFiles = (name: string, relativePath: string | null) => {
    const fullPath = path.join(
      __dirname,
      '../../../..',
      ...([name, relativePath].filter(Boolean) as Array<string>),
    );

    if (!fs.existsSync(fullPath)) {
      console.error(`Path does not exist: ${fullPath}`);
      return;
    }

    const allFiles = getAllFiles(fullPath);

    const wdsComponents = new Map<string, string>();
    const wdsUsages = new Map<string, Set<string>>();

    allFiles.forEach((filePath) => {
      if (
        filePath.endsWith('.ts') ||
        filePath.endsWith('.tsx') ||
        filePath.endsWith('.js') ||
        filePath.endsWith('.jsx')
      ) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const ast = parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
          });

          traverse(ast, {
            ImportDeclaration(importPath) {
              const source = importPath.node.source.value;
              if (
                source.startsWith('@wanteddev/wds') ||
                source.startsWith('@wanteddev/wds-icon') ||
                source.startsWith('@wanteddev/wds-lottie')
              ) {
                importPath.node.specifiers.forEach((specifier) => {
                  if (
                    t.isImportSpecifier(specifier) &&
                    t.isIdentifier(specifier.local) &&
                    'imported' in specifier &&
                    t.isIdentifier(specifier.imported)
                  ) {
                    wdsComponents.set(
                      specifier.local.name,
                      specifier.imported.name,
                    );
                  }
                });
              }
            },
          });

          traverse(ast, {
            JSXElement(jsxPath) {
              const openingElement = jsxPath.node.openingElement;
              if (t.isJSXIdentifier(openingElement.name)) {
                const componentName = openingElement.name.name;
                if (wdsComponents.has(componentName)) {
                  const importedComponentName =
                    wdsComponents.get(componentName)!;

                  const trackedComponentName =
                    importedComponentName.startsWith('Icon') &&
                    importedComponentName !== 'IconButton'
                      ? 'Icon'
                      : importedComponentName;

                  if (!wdsUsages.has(trackedComponentName)) {
                    wdsUsages.set(trackedComponentName, new Set());
                  }

                  wdsUsages
                    .get(trackedComponentName)!
                    .add(filePath + wdsUsages.get(trackedComponentName)!.size);
                }
              }
            },
          });
        } catch (error) {}
      }
    });

    return wdsUsages;
  };

  const results = SUPPORTS_PROJECTS.map((project) => {
    return {
      name: project.alias,
      usages:
        parseFiles(project.name, project.path) ??
        new Map<string, Set<string>>(),
    };
  });

  const total = results
    .map((result) =>
      [...result.usages]
        .map((v) => v[1].size)
        .reduce((acc, cur) => acc + cur, 0),
    )
    .reduce((acc, cur) => acc + cur, 0);

  // 모든 프로젝트의 컴포넌트 사용량을 합산
  const allComponents = new Map<string, number>();
  results.forEach((result) => {
    result.usages.forEach((files, component) => {
      allComponents.set(
        component,
        (allComponents.get(component) || 0) + files.size,
      );
    });
  });

  // 전체 상위 5개 컴포넌트
  const top5Components = [...allComponents.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([component, count]) => ({
      component,
      count,
    }));

  const webhook = new IncomingWebhook(webhookUrl);

  const today = new Date();

  await webhook.send({
    attachments: [
      {
        color: '#3366ff',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: `${today.getUTCFullYear()}/${today.getUTCMonth() + 1}/${today.getUTCDate()} 디자인시스템 웹 사용량`,
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: '*프로젝트 수*',
              },
              {
                type: 'mrkdwn',
                text: '*사용한 컴포넌트 수*',
              },
              {
                type: 'plain_text',
                emoji: true,
                text: `${SUPPORTS_PROJECTS.length}`,
              },
              {
                type: 'plain_text',
                emoji: true,
                text: `${total}`,
              },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*컴포넌트 사용 Top5*\n${top5Components.map(({ component, count }) => `- ${component}: ${count}`).join('\n')}`,
            },
          },
        ],
      },
    ],
  });
};

run();

//
