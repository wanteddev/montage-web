import { IconCircleInfo } from '@wanteddev/wds-icon';
import {
  ContentBadge,
  FlexBox,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@wanteddev/wds';

type Props = {
  params: [
    {
      name: string;
      type: string;
      required?: boolean;
      description?: string;
      defaultValue?: string;
    },
  ];
};

const ParamsTable = ({ params }: Props) => {
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
        {params.map(({ name, required, description, type, defaultValue }) => (
          <tr key={name}>
            <td>
              <FlexBox alignItems="center" gap="4px">
                <ContentBadge
                  size="medium"
                  color="accent"
                  accentColor="lightBlue"
                >
                  {`${name}${required ? ' *' : ''}`}
                </ContentBadge>
                {description && (
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
                    <TooltipContent>{description}</TooltipContent>
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
                {type}
              </Typography>
            </td>
            <td>
              <ContentBadge size="medium" color="neutral">
                {defaultValue ?? '-'}
              </ContentBadge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParamsTable;
