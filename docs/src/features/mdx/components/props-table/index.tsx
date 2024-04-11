'use client';
import { IconCircleInfo } from '@wanteddev/wds-icon';
import {
  ContentBadge,
  FlexBox,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@wanteddev/wds';

import { useMDXContext } from '../../context';

type Props = {
  component?: string;
  fallback?: Array<{
    name: string;
    description?: string;
    types: string;
    defaultValue?: string;
    required?: boolean;
  }>;
};

const PropsTable = ({ component, fallback }: Props) => {
  const { propTypes } = useMDXContext();

  const types = propTypes.find((c) => c.displayName === component);

  if (fallback?.length) {
    return (
      <ScrollArea>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Types</th>
              <th>defaultValue</th>
            </tr>
          </thead>
          <tbody>
            {fallback.map((value) => (
              <tr key={value.name}>
                <td>
                  <FlexBox alignItems="center" gap="4px">
                    <ContentBadge
                      size="small"
                      color="accent"
                      accentColor="palette.accent.lightBlue"
                    >
                      {`${value.name}${value.required ? ' *' : ''}`}
                    </ContentBadge>
                    {value.description && (
                      <Tooltip>
                        <TooltipTrigger>
                          <span
                            css={(theme) => ({
                              display: 'inline-block',
                              color: theme.palette.label.alternative,
                            })}
                          >
                            <IconCircleInfo />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          variant="inverse"
                          position="bottom-center"
                          css={{ maxWidth: '350px' }}
                        >
                          {value.description}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </FlexBox>
                </td>
                <td>
                  <Typography
                    variant="body1_reading"
                    weight="regular"
                    color="palette.accent.redOrange"
                  >
                    {value.types}
                  </Typography>
                </td>
                <td>
                  <ContentBadge size="small" color="neutral">
                    {value.defaultValue ?? '-'}
                  </ContentBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    );
  }

  if (!types) {
    return null;
  }

  const propValues = Object.entries(types.props);

  return (
    <ScrollArea>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Types</th>
            <th>defaultValue</th>
          </tr>
        </thead>
        <tbody>
          {propValues.map(([key, value]) => (
            <tr key={key}>
              <td>
                <FlexBox alignItems="center" gap="4px">
                  <ContentBadge
                    size="small"
                    color="accent"
                    accentColor="palette.accent.lightBlue"
                  >
                    {`${value.name}${value.required ? ' *' : ''}`}
                  </ContentBadge>
                  {value.description && (
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          css={(theme) => ({
                            display: 'inline-block',
                            color: theme.palette.label.alternative,
                          })}
                        >
                          <IconCircleInfo />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        variant="inverse"
                        position="bottom-center"
                        css={{ maxWidth: '350px' }}
                      >
                        {value.description}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </FlexBox>
              </td>
              <td>
                <Typography
                  variant="body1_reading"
                  weight="regular"
                  color="palette.accent.redOrange"
                >
                  {value.type.name}
                </Typography>
              </td>
              <td>
                <ContentBadge size="small" color="neutral">
                  {value.defaultValue?.value ?? '-'}
                </ContentBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default PropsTable;
