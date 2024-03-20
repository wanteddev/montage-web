import { IconCircleInfo } from '@wanteddev/wds-icon';
import {
  ContentBadge,
  FlexBox,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@wanteddev/wds';

import { useMDXContext } from '../../context';

type Props = {
  component?: string;
};

const PropsTable = ({ component }: Props) => {
  const { propTypes } = useMDXContext();

  const types = propTypes.find((c) => c.displayName === component);

  if (!types) {
    return null;
  }

  const propValues = Object.entries(types.props);

  return (
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
                  size="medium"
                  color="accent"
                  accentColor="lightBlue"
                >
                  {`${value.name}${value.required ? ' *' : ''}`}
                </ContentBadge>
                {value.description && (
                  <Tooltip variant="inverse" position="bottom-center">
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
                    <TooltipContent>{value.description}</TooltipContent>
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
              <ContentBadge size="medium" color="neutral">
                {value.defaultValue?.value ?? '-'}
              </ContentBadge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropsTable;
