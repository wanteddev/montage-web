import {
  Chip,
  FlexBox,
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
  Typography,
} from '@wanteddev/wds';
import {
  IconCircleExclamationFill,
  IconCopy,
  IconImage,
  IconRefresh,
} from '@wanteddev/wds-icon';

import { errorStyle, toolbarStyle } from './style';

import type { Dispatch, SetStateAction } from 'react';

type Props = {
  errorMessage?: string;
  onCopy: () => void;
  onReset: () => void;
  isTransparent: boolean;
  onIsTransparentChange: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  onCollapseChange: Dispatch<SetStateAction<boolean>>;
};

const Toolbar = ({
  errorMessage,
  onCopy,
  onReset,
  isTransparent,
  onIsTransparentChange,
  collapsed,
  onCollapseChange,
}: Props) => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="space-between"
      gap="16px"
      data-role="demo-toolbar"
      sx={toolbarStyle}
    >
      <FlexBox sx={errorStyle} gap="4px" alignItems="center">
        {errorMessage && (
          <>
            <IconCircleExclamationFill aria-hidden />
            <Typography color="semantic.status.negative" variant="caption1">
              {errorMessage}
            </Typography>
          </>
        )}
      </FlexBox>
      <FlexBox alignItems="center" justifyContent="flex-end" gap="16px">
        <Chip
          size="small"
          variant="outlined"
          color="assistive"
          onClick={() => onCollapseChange((prev) => !prev)}
          sx={{ borderRadius: '9999px' }}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </Chip>

        <TooltipGroup>
          <Tooltip>
            <TooltipTrigger>
              <IconButton size={18} onClick={onCopy} name="Copy">
                <IconCopy />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent offset={12} size="small">
              Copy
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton size={18} onClick={onReset} name="Reset">
                <IconRefresh />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent offset={12} size="small">
              Reset
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton
                size={18}
                onClick={() => onIsTransparentChange((prev) => !prev)}
                name={
                  isTransparent
                    ? 'Change background to normal'
                    : 'Change background to transparent'
                }
              >
                <IconImage />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent offset={12} size="small">
              Change Background
            </TooltipContent>
          </Tooltip>
        </TooltipGroup>
      </FlexBox>
    </FlexBox>
  );
};

export default Toolbar;
