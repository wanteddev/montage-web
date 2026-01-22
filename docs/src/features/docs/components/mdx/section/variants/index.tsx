import {
  FormControl,
  FormField,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
} from '@wanteddev/wds';
import {
  FlexBox,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Typography,
  useTheme,
} from '@wanteddev/wds';
import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';
import { memo, useEffect, useMemo, useState } from 'react';
import { IconTune } from '@wanteddev/wds-icon';

import { Heading2 } from '../layout';
import { sectionLayoutStyle } from '../style';
import { useRunner } from '../../demo/react-runner';

import Carousel from './internal/carousel';
import {
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

import type { SectionSelectedVariants } from './types';
import type { PropsWithChildren } from 'react';

const SectionVariants = ({
  components,
  internals = [],
  icons = [],
  variants,
  render,
  states,
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
      const firstLabel = variant.defaultValue ?? variant.options[0]?.label;

      if (firstLabel) {
        return {
          ...acc,
          [variant.key]: {
            value: firstLabel,
          },
        };
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

  const renderResult = useMemo(() => {
    if (render) {
      return render(
        Object.entries(selectedVariant).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value.value,
          }),
          {},
        ),
      );
    }

    return undefined;
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
      data-role="variants"
      sx={sectionLayoutStyle}
      flexDirection="column"
    >
      <Heading2 content="Variants" sx={{ marginBottom: '24px' }} />

      <FlexBox flexDirection="row" gap="24px" sx={sectionVariantsStyle}>
        <FlexBox
          flexDirection="column"
          justifyContent="space-between"
          flex="1"
          sx={{ maxWidth: '100%' }}
        >
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
              position="bottom-end"
              variant="custom"
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
            internals={internals}
            render={renderResult}
            states={states}
          />
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
    </FlexBox>
  );
};

type SectionVariantsItemDemoProps = PropsWithChildren<{
  props: Record<string, any>;
  components: Array<string>;
  icons: Array<string>;
  render?: string;
  states?: string;
  internals?: Array<string>;
}>;

const SectionVariantsItemDemo = memo(
  ({
    props,
    components,
    icons,
    render,
    states,
    internals,
  }: SectionVariantsItemDemoProps) => {
    const code = useMemo(() => {
      return makeSectionVariantDemoCode(
        components,
        icons,
        internals,
        props,
        render,
        states,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props), render, states]);

    const scope = useMemo(() => {
      return {
        import: {
          react: React,
          '@wanteddev/wds': Wds,
          '@wanteddev/wds-icon': WdsIcon,
          internal: { Carousel },
        },
      };
    }, []);

    const { element } = useRunner({
      code,
      scope,
    });

    return (
      <ScrollArea scrollbars="both" zIndex={11} sx={sectionVariantsDemoStyle}>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ height: '100%' }}
        >
          {element}
        </FlexBox>
      </ScrollArea>
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

export default SectionVariants;
