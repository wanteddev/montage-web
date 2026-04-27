import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const exceptionBranches = ['main'];

const requiredIssueID =
  /^pi-[0-9]|fe-[0-9]|^dp-[0-9]|^def-[0-9]|^live-[0-9]|^wrp-[0-9]/i;
const hasIssueID = (str) => requiredIssueID.test(str);

const exec = (cmd) => execSync(cmd, { encoding: 'utf-8' });

const getSubject = (preSubject, issueNo) => {
  if (hasIssueID(preSubject)) {
    return preSubject;
  }

  return `${issueNo.toUpperCase()} ${preSubject}`;
};

const getDescription = (preDescription, issueNo) => {
  const jiraIssueUrl = issueNo
    ? `https://wantedlab.atlassian.net/browse/${issueNo} \n`
    : '';

  return `${jiraIssueUrl}${preDescription}`.replace(/,/gi, '');
};

const getJiraIssueNumber = (branch) =>
  branch.split('/').filter((word) => hasIssueID(word));

const checkStartWithComment = (line) => (line.startsWith('#') ? '' : line);

const parseCommitMsg = (commitMsgData) => {
  const [subject, secondLine, ...descriptions] = commitMsgData.split('\n');
  const descriptionsNewLine = descriptions
    .map((description) => `${description}\n`)
    .join('');
  const parsedSubject = checkStartWithComment((subject ?? '').trim());

  return !secondLine
    ? [parsedSubject, descriptionsNewLine]
    : [parsedSubject, `${secondLine}${descriptionsNewLine}`];
};

const createCommitMsg = () => {
  const currentBranch = exec('git rev-parse --abbrev-ref HEAD').trim();
  const commitMsgArg = process.argv[2];
  const COMMIT_MSG_FILE_PATH = path.isAbsolute(commitMsgArg)
    ? commitMsgArg
    : `./${commitMsgArg}`; // .git/EDIT_MSG
  const isFeatureBranch = currentBranch.includes('feature');
  const jiraIssueNo = (getJiraIssueNumber(currentBranch)[0] ?? '').replace(
    /\n/i,
    '',
  );
  const editedCommitMsgData = fs.readFileSync(COMMIT_MSG_FILE_PATH, 'utf-8');

  if (exceptionBranches.includes(currentBranch)) {
    return;
  }

  if (isFeatureBranch && !jiraIssueNo) {
    console.error(
      `현재 브랜치: "${currentBranch}"에 지라 이슈번호가 포함되지 않았습니다.`,
    );
  }

  const [preSubject = '', preDescription = ''] =
    parseCommitMsg(editedCommitMsgData);
  const subject = getSubject(preSubject, jiraIssueNo);
  const description = getDescription(preDescription, jiraIssueNo);

  if (preSubject && jiraIssueNo && isFeatureBranch && !hasIssueID(preSubject)) {
    console.log(
      '현재 커밋 Commit Title 에 이슈번호가 포함되지 않아 현재 브랜치의 이슈 번호로 Commit Title을 생성합니다.',
    );
    console.log(`as-is : ${preSubject}`);
    console.log(`to-be : ${subject}`);
  }

  const replacedCommitMsg = `${subject}\n\n${description}`;
  const commitMsg = preSubject ? replacedCommitMsg : '';

  fs.writeFileSync(COMMIT_MSG_FILE_PATH, commitMsg, 'utf-8');
};

createCommitMsg();
