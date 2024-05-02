import type {
  API,
  FileInfo,
  Identifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXOpeningElement,
  Options,
} from 'jscodeshift';

const wdsIcomElements = [
  'IconAndroid',
  'IconApps',
  'IconArrowDown',
  'IconArrowLeft',
  'IconArrowRight',
  'IconArrowUp',
  'IconBellFill',
  'IconBellPlus',
  'IconBell',
  'IconBookFill',
  'IconBook',
  'IconBookmarkFill',
  'IconBookmark',
  'IconBubbleFill',
  'IconBubblePlusFill',
  'IconBubblePlus',
  'IconBubble',
  'IconBusinessBagFill',
  'IconBusinessBag',
  'IconCalendar',
  'IconCameraFill',
  'IconCamera',
  'IconCaretDown',
  'IconCaretUp',
  'IconChange',
  'IconCheckThick',
  'IconCheck',
  'IconChevronDoubleLeftSmall',
  'IconChevronDoubleLeftThickSmall',
  'IconChevronDoubleLeftThick',
  'IconChevronDoubleLeft',
  'IconChevronDoubleRightSmall',
  'IconChevronDoubleRightThickSmall',
  'IconChevronDoubleRightThick',
  'IconChevronDoubleRight',
  'IconChevronDownSmall',
  'IconChevronDownThickSmall',
  'IconChevronDownThick',
  'IconChevronDown',
  'IconChevronLeftSmall',
  'IconChevronLeftThickSmall',
  'IconChevronLeftThick',
  'IconChevronLeft',
  'IconChevronRightSmall',
  'IconChevronRightThickSmall',
  'IconChevronRightThick',
  'IconChevronRight',
  'IconChevronUpSmall',
  'IconChevronUpThickSmall',
  'IconChevronUpThick',
  'IconChevronUp',
  'IconCircleBlock',
  'IconCircleCheckFill',
  'IconCircleCheck',
  'IconCircleClose',
  'IconCircleExclamationFill',
  'IconCircleExclamation',
  'IconCircleFill',
  'IconCircleInfoFill',
  'IconCircleInfo',
  'IconCirclePlusFill',
  'IconCirclePlus',
  'IconCirclePoint',
  'IconCircleQuestionFill',
  'IconCircleQuestion',
  'IconCircle',
  'IconCloseThick',
  'IconClose',
  'IconCoinsFill',
  'IconCoins',
  'IconCompanyCheckFill',
  'IconCompanyCheck',
  'IconCompanyFill',
  'IconCompanyPlusFill',
  'IconCompanyPlus',
  'IconCompany',
  'IconCompassFill',
  'IconCompass',
  'IconCopy',
  'IconCrownFill',
  'IconCrown',
  'IconDesktopFill',
  'IconDesktop',
  'IconDocumentFill',
  'IconDocumentPersonFill',
  'IconDocumentPerson',
  'IconDocumentTextFill',
  'IconDocumentText',
  'IconDocument',
  'IconDot',
  'IconDownload',
  'IconExclamation',
  'IconExternalLink',
  'IconEyeFill',
  'IconEyeSlashFill',
  'IconEyeSlash',
  'IconEye',
  'IconFaceSmileFill',
  'IconFaceSmile',
  'IconFilterFill',
  'IconFilter',
  'IconFolderFill',
  'IconFolderJobFill',
  'IconFolderJob',
  'IconFolderStarFill',
  'IconFolderStar',
  'IconFolder',
  'IconFull',
  'IconGlobe',
  'IconGraduation',
  'IconHandle',
  'IconHeartFill',
  'IconHeart',
  'IconHistory',
  'IconHomeFill',
  'IconHome',
  'IconImage',
  'IconKeyboard',
  'IconLikeFill',
  'IconLike',
  'IconLineHorizontalThick',
  'IconLineHorizontal',
  'IconLink',
  'IconListCategory',
  'IconList',
  'IconLocationFill',
  'IconLocation',
  'IconLockFill',
  'IconLockOpenFill',
  'IconLockOpen',
  'IconLock',
  'IconLogoApple',
  'IconLogoFacebook',
  'IconLogoGooglePlay',
  'IconLogoInstagram',
  'IconLogoKakao',
  'IconLogoLinkedIn',
  'IconLogoNaverBlog',
  'IconLogoYoutube',
  'IconMagicWand',
  'IconMail',
  'IconMenuThick',
  'IconMenu',
  'IconMessageFill',
  'IconMessage',
  'IconMinusThick',
  'IconMinus',
  'IconMobileFill',
  'IconMobile',
  'IconMoreHorizontal',
  'IconMoreVertical',
  'IconNavigationCareer',
  'IconNavigationMenu',
  'IconNavigationMypage',
  'IconNavigationRecruit',
  'IconNavigationSocial',
  'IconPause',
  'IconPencilFill',
  'IconPencil',
  'IconPersonFill',
  'IconPersonPlusFill',
  'IconPersonPlus',
  'IconPerson',
  'IconPersonsFill',
  'IconPersons',
  'IconPinFill',
  'IconPin',
  'IconPlay',
  'IconPlusThick',
  'IconPlus',
  'IconQuestion',
  'IconRefresh',
  'IconSearchThick',
  'IconSearch',
  'IconSendFill',
  'IconSend',
  'IconSetting',
  'IconShareIos',
  'IconShare',
  'IconSquareFill',
  'IconSquareHan',
  'IconSquareHangul',
  'IconSquareKana',
  'IconSquareLatin',
  'IconSquareMore',
  'IconSquarePlusFill',
  'IconSquarePlus',
  'IconSquare',
  'IconStarFill',
  'IconStar',
  'IconSymbol',
  'IconTemplateFill',
  'IconTemplate',
  'IconThumbnail',
  'IconThunderFill',
  'IconThunder',
  'IconTrash',
  'IconTriangleExclamationFill',
  'IconTriangleExclamation',
  'IconTriangleFill',
  'IconTriangle',
  'IconTrophyFill',
  'IconTrophy',
  'IconTune',
  'IconUpload',
  'IconVerifiedCheckFill',
  'IconVerifiedCheck',
  'IconVerifiedStarFill',
  'IconVerifiedStar',
  'IconWrite',
];

const wdsElements = [
  'Box',
  'ThemeProvider',
  'ClassNames',
  'Global',
  'Alert',
  'Avatar',
  'AvatarButton',
  'AvatarGroup',
  'Button',
  'Checkbox',
  'ChipAction',
  'ChipMultiSelect',
  'ContentBadge',
  'DismissableLayer',
  'Divider',
  'FlexBox',
  'FloatingAction',
  'Grid',
  'GridItem',
  'ImageLoader',
  'IconButton',
  'Label',
  'NestedCheckbox',
  'NoSsr',
  'Portal',
  'ProgressIndicator',
  'PushBadge',
  'RegionConfig',
  'RoundCheckbox',
  'ScrollArea',
  'Select',
  'Skeleton',
  'Switch',
  'TextArea',
  'TextButton',
  'TextField',
  'Thumbnail',
  'ToggleIcon',
  'Typography',
  'WithInteraction',
  'CompactTooltip',
  'CompactTooltipContent',
  'CompactTooltipTrigger',
  'Form',
  'FormControl',
  'FormDescription',
  'FormErrorMessage',
  'FormField',
  'FormItem',
  'FormLabel',
  'FormMessage',
  'Modal',
  'ModalActionArea',
  'ModalActionButton',
  'ModalContainer',
  'ModalContent',
  'ModalContentItem',
  'ModalDescription',
  'ModalHeading',
  'ModalNavigation',
  'ModalSummary',
  'Popover',
  'PopoverContent',
  'PopoverTrigger',
  'Popper',
  'PopperAnchor',
  'PopperArrow',
  'PopperContent',
  'ProgressStepIndicator',
  'ProgressStepIndicatorItem',
  'ProgressTracker',
  'ProgressTrackerItem',
  'RadioGroup',
  'RadioGroupItem',
  'Tab',
  'TabList',
  'TabListItem',
  'TabPanel',
  'Tooltip',
  'TooltipContent',
  'TooltipTrigger',
];

const jsxElements = [
  'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'bgsound',
  'big',
  'blink',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'content',
  'data',
  'datalist',
  'dd',
  'decorator',
  'del',
  'details',
  'dfn',
  'dir',
  'div',
  'dl',
  'dt',
  'element',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'isindex',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'listing',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'nobr',
  'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'plaintext',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'shadow',
  'small',
  'source',
  'spacer',
  'span',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'xmp',
];

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length > 0) {
    const typeSpecifiers: Array<
      ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
    > = [];
    const specifiers: Array<
      ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
    > = [];

    root
      .find(j.ImportDeclaration, {
        source: { value: '@emotion/react' },
      })
      .forEach((emotionImport) => {
        hasChanges = true;
        emotionImport.node.specifiers?.forEach((specifier) => {
          if (emotionImport.node.importKind === 'type') {
            typeSpecifiers.push(specifier);
          } else {
            specifiers.push(specifier);
          }
        });

        j(emotionImport).remove();
      });

    const typeImport = root.find(j.ImportDeclaration, {
      source: { value: '@wanteddev/wds' },
      importKind: 'type',
    });

    if (typeSpecifiers.length > 0) {
      if (typeImport.length === 0) {
        root
          .get()
          .node.program.body.unshift(
            j.importDeclaration(
              typeSpecifiers,
              j.literal('@wanteddev/wds'),
              'type',
            ),
          );
      } else {
        typeSpecifiers.forEach((type) => {
          typeImport.get().node.specifiers.push(type);
        });
      }
    }

    const impor = root.find(j.ImportDeclaration, {
      source: { value: '@wanteddev/wds' },
      importKind: { value: 'type' },
    });

    if (specifiers.length > 0) {
      if (impor.length === 0) {
        root
          .get()
          .node.program.body.unshift(
            j.importDeclaration(specifiers, j.literal('@wanteddev/wds')),
          );
      } else {
        specifiers.forEach((type) => {
          impor.get().node.specifiers.push(type);
        });
      }
    }
  } else {
    const typeSpecifiers: Array<
      ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
    > = [];
    const specifiers: Array<
      ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
    > = [];

    root
      .find(j.ImportDeclaration, {
        source: { value: '@emotion/react' },
      })
      .forEach((emotionImport) => {
        hasChanges = true;
        emotionImport.node.specifiers?.forEach((specifier) => {
          if (emotionImport.node.importKind === 'type') {
            typeSpecifiers.push(specifier);
          } else {
            specifiers.push(specifier);
          }
        });

        j(emotionImport).remove();
      });

    if (typeSpecifiers.length > 0) {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(
            typeSpecifiers,
            j.literal('@wanteddev/wds'),
            'type',
          ),
        );
    }
    if (specifiers.length > 0) {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(specifiers, j.literal('@wanteddev/wds')),
        );
    }
  }

  let shouldAddBoxImport = false;

  root.find(j.JSXElement).forEach((jsx) => {
    j(jsx)
      .find(j.JSXAttribute, (v: JSXAttribute) => v.name.name === 'css')
      .forEach((css) => {
        hasChanges = true;
        css.node.name = j.jsxIdentifier('sx');
      });

    j(jsx)
      .find(
        j.JSXAttribute,
        (v: JSXAttribute) =>
          v.name.name === 'xs' ||
          v.name.name === 'sm' ||
          v.name.name === 'md' ||
          v.name.name === 'lg' ||
          v.name.name === 'xl',
      )
      .forEach((responsive) => {
        j(responsive)
          .find(j.Identifier, (p: Identifier) => p.name === 'css')
          .forEach((css) => {
            css.node.name = 'sx';
            hasChanges = true;
          });
      });

    const otherTags = j(jsx).find(
      j.JSXOpeningElement,
      (v: JSXOpeningElement) =>
        v.name.type === 'JSXIdentifier' &&
        !wdsElements.includes(v.name.name) &&
        !wdsIcomElements.includes(v.name.name) &&
        v.attributes?.find(
          (a) => a.type === 'JSXAttribute' && a.name.name === 'sx',
        ),
    );

    if (otherTags.length > 0) {
      shouldAddBoxImport = true;
      otherTags.forEach((html) => {
        j(html)
          .find(j.JSXAttribute, (v: JSXAttribute) => v.name.name === 'css')
          .forEach((css) => {
            hasChanges = true;
            css.node.name = j.jsxIdentifier('sx');
          });
      });

      otherTags.forEach((html) => {
        if (html.node.name.type !== 'JSXIdentifier') {
          return;
        }
        const prevTagName = html.node.name.name;

        html.node.name.name = 'Box';
        html.node.attributes?.push(
          j.jsxAttribute(
            j.jsxIdentifier('as'),
            jsxElements.includes(prevTagName)
              ? j.literal(prevTagName)
              : j.jsxExpressionContainer(j.identifier(prevTagName)),
          ),
        );

        if (!html.node.selfClosing && html.parent?.value?.closingElement) {
          html.parent.value.closingElement = j.jsxClosingElement(
            j.jsxIdentifier('Box'),
          );
        }

        hasChanges = true;
      });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (shouldAddBoxImport) {
    const importDeclar = root.find(j.ImportDeclaration, {
      source: { value: '@wanteddev/wds' },
      importKind: 'value',
    });

    if (importDeclar.length > 0) {
      hasChanges = true;

      importDeclar.forEach((v, i) => {
        if (i === 0) {
          if (!v.node.specifiers?.find((s) => s.local?.name === 'Box')) {
            v.node.specifiers?.push(j.importSpecifier(j.identifier('Box')));
          }
        }
      });
    } else {
      hasChanges = true;
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('Box'))],
            j.literal('@wanteddev/wds'),
          ),
        );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
}
