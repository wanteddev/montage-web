import {
  ContentBadge,
  Divider,
  FlexBox,
  FormControl,
  FormField,
  FormLabel,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Thumbnail,
  Typography,
  useTheme,
} from '@wanteddev/wds';
import {
  IconCircleCheckFill,
  IconCircleCloseFill,
  IconTune,
} from '@wanteddev/wds-icon';
import { Fragment, memo, useEffect, useId, useMemo, useState } from 'react';
import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';

import HeadingLink from '../heading-link';
import { inlineCodeStyle } from '../code-block/style';
import { anatomyItemPinStyle, anatomyItemStyle } from '../anatomy/style';
import { useRunner } from '../demo/react-runner';

import {
  customizeStyle,
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionFigureVariantStyle,
  sectionHierarchyItemStyle,
  sectionLayoutStyle,
  sectionVariantsControlMobileStyle,
  sectionVariantsControlMobileTriggerStyle,
  sectionVariantsControlStyle,
  sectionVariantsDemoStyle,
  sectionVariantsItemRadioStyle,
  sectionVariantsStyle,
} from './style';
import {
  getVariantValueWithDisabled,
  makeSectionVariantDemoCode,
} from './helpers';

import type {
  SectionSelectedVariants,
  SectionVariants as SectionVariantsType,
} from './types';
import type { ComponentProps, PropsWithChildren } from 'react';

type HeadingProps = {
  content?: string;
};

const Heading2 = ({ content }: HeadingProps) => {
  if (!content) return null;

  return (
    <Typography
      as="h2"
      data-heading=""
      variant="title3"
      weight="bold"
      color="semantic.label.normal"
      id={content.replaceAll(' ', '-')}
    >
      <HeadingLink id={content.replaceAll(' ', '-')}>{content}</HeadingLink>
    </Typography>
  );
};

const Heading3 = ({ content }: HeadingProps) => {
  if (!content) return null;

  return (
    <Typography
      as="h3"
      data-heading=""
      variant="heading2"
      weight="bold"
      color="semantic.label.normal"
      id={content.replaceAll(' ', '-')}
    >
      <HeadingLink id={content.replaceAll(' ', '-')}>{content}</HeadingLink>
    </Typography>
  );
};

type DescriptionProps = {
  content?: string;
};

const Description = ({ content }: DescriptionProps) => {
  if (!content) return null;

  return (
    <Typography
      variant="body2-reading"
      weight="regular"
      as="p"
      color="semantic.label.neutral"
      sx={{ marginBottom: '0 !important' }}
    >
      {content.split('\n').map((v, i) => (
        <Fragment key={i}>
          {v}
          <br />
        </Fragment>
      ))}
    </Typography>
  );
};

type SectionLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
  direction?: 'row' | 'column';
}>;

const SectionLayout = ({
  title,
  children,
  description,
  direction = 'column',
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content={title} />

        <Description content={description} />
      </FlexBox>
      <FlexBox
        flexDirection={direction}
        gap={direction === 'row' ? '20px' : '88px'}
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
};

type SectionFigureGroupProps = PropsWithChildren<{
  title?: string;
}>;

const SectionFigureGroup = ({ children, title }: SectionFigureGroupProps) => {
  return (
    <FlexBox
      flexDirection="column"
      data-role="section-figure-group"
      sx={[sectionLayoutStyle, { marginBottom: '0 !important' }]}
    >
      <Heading3 content={title} />
      <FlexBox flexDirection="column" gap="88px">
        {children}
      </FlexBox>
    </FlexBox>
  );
};

type SectionFigureProps = {
  title?: string;
  description?: string;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
  variant?: 'positive' | 'negative';
};

const SectionFigure = ({
  ratio = '21:9',
  portrait,
  title,
  src,
  description,
  variant,
}: SectionFigureProps) => {
  const id = useId();

  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      {src && (
        <Thumbnail
          aria-labelledby={id}
          src={src}
          alt="thumbnail"
          disableOptimize
          width="100%"
          sx={[sectionFigureThumbnailStyle, variant && { marginBottom: 12 }]}
          ratio={ratio}
          radius
          portrait={portrait}
        />
      )}
      {variant ? (
        <FlexBox gap="16px" sx={sectionFigureVariantStyle(variant)}>
          {variant === 'positive' ? (
            <IconCircleCheckFill sx={{ fontSize: 40 }} />
          ) : (
            <IconCircleCloseFill sx={{ fontSize: 40 }} />
          )}
          <FlexBox
            flexDirection="column"
            gap="2px"
            sx={{ ['&& p']: { marginBottom: '0 !important' } }}
          >
            <Typography
              color={
                variant === 'positive'
                  ? 'semantic.status.positive'
                  : 'semantic.status.negative'
              }
              variant="headline2"
              weight="bold"
            >
              {variant === 'positive' ? 'Do' : "Don't"}
            </Typography>

            <Description content={description} />
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox flexDirection="column" gap="4px">
          {title && (
            <Typography
              as="p"
              variant="headline2"
              weight="bold"
              color="semantic.label.normal"
              id={id}
            >
              {title}
            </Typography>
          )}

          <Description content={description} />
        </FlexBox>
      )}
    </FlexBox>
  );
};

type SectionStatesProps = {
  description?: string;
  options?: Array<string>;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
};

const SectionStates = ({
  description,
  options,
  ratio = '21:9',
  portrait,
  src,
}: SectionStatesProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content="States" />

        <Description content={description} />

        {src && (
          <Thumbnail
            aria-labelledby="states"
            src={src}
            alt="component states"
            disableOptimize
            width="100%"
            sx={sectionFigureThumbnailStyle}
            ratio={ratio}
            portrait={portrait}
          />
        )}
      </FlexBox>
      <FlexBox flexWrap="wrap" rowGap="8px" columnGap="64px" flex="1 0 auto">
        {options?.map((value, i) => (
          <FlexBox
            key={value + i}
            sx={[anatomyItemStyle, { width: 200 }]}
            alignItems="center"
            gap="12px"
          >
            <Typography
              variant="caption1"
              weight="bold"
              sx={anatomyItemPinStyle}
            >
              <span>{i + 1}</span>
            </Typography>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.label.normal"
            >
              {value}
            </Typography>
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

type CustomizeProps = {
  data: Array<{
    key: string;
    options: Array<string>;
  }>;
};

const SectionCustomize = ({ data }: CustomizeProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Customize" />

      {data.map((v, i) => (
        <Fragment key={v.key}>
          <FlexBox sx={customizeStyle}>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.label.strong"
              sx={{ minWidth: 120 }}
            >
              {v.key}
            </Typography>

            <FlexBox gap="6px" flexWrap="wrap">
              {v.options.map((option) => (
                <code key={option}>
                  <ContentBadge
                    color="accent"
                    accentColor="semantic.accent.foreground.blue"
                    sx={inlineCodeStyle}
                  >
                    {option}
                  </ContentBadge>
                </code>
              ))}
            </FlexBox>
          </FlexBox>

          {i !== data.length - 1 && (
            <Divider color="semantic.line.normal.alternative" />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

const SectionHierarchy = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox flexDirection="column" gap="56px" sx={sectionLayoutStyle}>
      <Heading2 content="Hierarchy" />
      <FlexBox flexDirection="column">{children}</FlexBox>
    </FlexBox>
  );
};

type SectionHierarchyItemProps = {
  level: number;
  description: string;
  render?: string;
};

const SectionHierarchyItem = ({
  level,
  description,
  render,
}: SectionHierarchyItemProps) => {
  const scope = React.useMemo(() => {
    return {
      import: {
        react: React,
        '@wanteddev/wds': Wds,
      },
    };
  }, []);

  const { element } = useRunner({
    code: render ?? '',
    scope,
  });

  return (
    <FlexBox sx={sectionHierarchyItemStyle}>
      <ContentBadge
        color="neutral"
        size="small"
        variant="solid"
        sx={{ flexShrink: 0 }}
      >
        L{level}
      </ContentBadge>

      {element}

      <Description content={description} />
    </FlexBox>
  );
};

type SectionVariantsProps = {
  title?: string;
  description?: string;
  components: Array<string>;
  icons?: Array<string>;
  variants: SectionVariantsType;
};

const SectionVariants = ({
  title,
  description,
  components,
  icons = [],
  variants,
}: SectionVariantsProps) => {
  const theme = useTheme();
  const [mobileControlOpen, setMobileControlOpen] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(min-width: ${theme.breakpoint.sm})`,
    );

    const handleChange = () => {
      setMobileControlOpen((prev) => (prev ? !mediaQueryList.matches : false));
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [theme.breakpoint.sm]);

  const defaultSelectedVariant = useMemo(() => {
    const defaultVariant = variants.reduce((acc, variant) => {
      const firstLabel = variant.options[0]?.label;

      if (firstLabel) {
        return { ...acc, [variant.key]: { value: variant.options[0]?.label } };
      }

      return acc;
    }, {}) as SectionSelectedVariants;

    return getVariantValueWithDisabled(variants, defaultVariant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedVariant, setSelectedVariant] = useState(
    defaultSelectedVariant,
  );

  const props = useMemo<Record<string, any>>(() => {
    return Object.entries(selectedVariant).reduce((acc, [key, value]) => {
      if (value.disabled) {
        return acc;
      }
      const val = variants
        .find((variant) => variant.key === key)
        ?.options.find((option) => option.label === value.value)?.value;

      return { ...acc, ...val };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedVariant)]);

  const handleSelectedVariantChange = (
    value: Record<string, { value: string }>,
  ) => {
    const newValue = {
      ...Object.entries(selectedVariant).reduce(
        (acc, [key, v]) => {
          acc[key] = { value: v.value };
          return acc;
        },
        {} as typeof defaultSelectedVariant,
      ),
      ...value,
    };

    setSelectedVariant(getVariantValueWithDisabled(variants, newValue));
  };

  return (
    <FlexBox
      flexDirection="row"
      gap="24px"
      sx={[sectionLayoutStyle, sectionVariantsStyle]}
    >
      <FlexBox flexDirection="column" justifyContent="space-between" flex="1">
        <Popover open={mobileControlOpen} onOpenChange={setMobileControlOpen}>
          <PopoverTrigger>
            <IconButton
              size={24}
              sx={sectionVariantsControlMobileTriggerStyle}
              aria-label="Toggle control panel"
            >
              <IconTune />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent
            sx={sectionVariantsControlMobileStyle}
            position="top-end"
            offset={16}
          >
            <ScrollArea sx={{ width: '100%' }}>
              {variants.map((variant) => (
                <FlexBox key={variant.key} flexDirection="column" gap="12px">
                  <Typography
                    variant="label1"
                    weight="bold"
                    color="semantic.label.assistive"
                  >
                    {variant.key}
                  </Typography>
                  <SectionVariantsItem
                    options={variant.options}
                    variantKey={variant.key}
                    disabled={selectedVariant[variant.key]?.disabled}
                    value={selectedVariant[variant.key]?.value ?? ''}
                    onSelectedVariantChange={handleSelectedVariantChange}
                  />
                </FlexBox>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <SectionVariantsItemDemo
          props={props}
          components={components}
          icons={icons}
        />
        <FlexBox
          flexDirection="column"
          gap="4px"
          sx={{ padding: '20px 12px 12px' }}
        >
          <Typography
            variant="headline2"
            weight="bold"
            color="semantic.label.normal"
          >
            {title}
          </Typography>
          <Description content={description} />
        </FlexBox>
      </FlexBox>

      <ScrollArea sx={sectionVariantsControlStyle}>
        <FlexBox flexDirection="column" gap="32px">
          {variants.map((variant) => (
            <FlexBox key={variant.key} flexDirection="column" gap="12px">
              <Typography
                variant="label1"
                weight="bold"
                color="semantic.label.assistive"
              >
                {variant.key}
              </Typography>
              <SectionVariantsItem
                options={variant.options}
                variantKey={variant.key}
                disabled={selectedVariant[variant.key]?.disabled}
                value={selectedVariant[variant.key]?.value ?? ''}
                onSelectedVariantChange={handleSelectedVariantChange}
              />
            </FlexBox>
          ))}
        </FlexBox>
      </ScrollArea>
    </FlexBox>
  );
};

type SectionVariantsItemDemoProps = PropsWithChildren<{
  props: Record<string, any>;
  components: Array<string>;
  icons: Array<string>;
}>;

const SectionVariantsItemDemo = memo(
  ({ props, components, icons }: SectionVariantsItemDemoProps) => {
    const code = useMemo(() => {
      return makeSectionVariantDemoCode(components, icons, props);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props)]);

    const scope = useMemo(() => {
      return {
        import: {
          react: React,
          '@wanteddev/wds': Wds,
          '@wanteddev/wds-icon': WdsIcon,
        },
      };
    }, []);

    const { element } = useRunner({
      code,
      scope,
    });

    return (
      <FlexBox
        flex="1"
        sx={sectionVariantsDemoStyle}
        justifyContent="center"
        alignItems="center"
      >
        {element}
      </FlexBox>
    );
  },
);

type SectionVariantsItemProps = PropsWithChildren<{
  value: string;
  variantKey: string;
  options: Array<{
    label: string;
    value: Record<string, any>;
  }>;
  disabled?: boolean;
  onSelectedVariantChange: (value: Record<string, { value: string }>) => void;
}>;

const SectionVariantsItem = ({
  variantKey,
  value,
  options = [],
  disabled,
  onSelectedVariantChange,
}: SectionVariantsItemProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(newValue) => {
        onSelectedVariantChange({ [variantKey]: { value: newValue } });
      }}
    >
      <FlexBox flexDirection="column" gap="16px">
        {options.map((option) => (
          <FormField
            key={option.label}
            flexDirection="row"
            alignItems="center"
            gap="8px"
          >
            <FormControl>
              <RadioGroupItem value={option.label} disabled={disabled} />
            </FormControl>
            <FormLabel
              sx={sectionVariantsItemRadioStyle}
              data-disabled={disabled}
              data-selected={value === option.label}
            >
              {option.label}
            </FormLabel>
          </FormField>
        ))}
      </FlexBox>
    </RadioGroup>
  );
};

export {
  SectionLayout,
  SectionFigure,
  SectionFigureGroup,
  SectionStates,
  SectionCustomize,
  SectionHierarchy,
  SectionHierarchyItem,
  SectionVariants,
};
