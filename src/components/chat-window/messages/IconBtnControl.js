import React from 'react';
import {  IconButton, Tooltip, Whisper, Icon } from 'rsuite';
/*eslint-disable*/
export const IconBtnControl = ({
  isVisible,
  iconName,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) => (
  <div
    className="ml-2"
    style={{ visibility: isVisible ? 'visible' : 'hidden' }}
  >
      <Whisper
        placement="top"
        delay={0}
        delayHide={0}
        delayShow={0}
        trigger="hover"
        speaker={<Tooltip>{tooltip}</Tooltip>}
      >
        <IconButton
          {...props}
          onClick={onClick}
          circle
          size="xs"
          icon={<Icon icon={iconName} />}
        />
      </Whisper>
  </div>
);
