import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { compose, flex, space, SpaceProps } from 'styled-system';
import { deviceSize } from '@utils/constants';
import { deviceOptions } from '../../interfaces';

export interface HiddenProps extends SpaceProps {
  down?: number | deviceOptions;
  up?: number | deviceOptions;
  [key: string]: unknown;
  children: ReactElement;
}

const StyledHidden = styled.div<HiddenProps & SpaceProps>(
  ({ up, down }) => {
    const upDeviceSize = deviceSize[up] || up;
    const downDeviceSize = deviceSize[down] || down;

    if (up)
      return {
        [`@media only screen and (min-width: ${upDeviceSize + 1}px)`]: {
          display: 'none'
        }
      };
    if (down)
      return {
        [`@media only screen and (max-width: ${downDeviceSize}px)`]: {
          display: 'none'
        }
      };
    return {
      display: 'none'
    };
  },
  compose(space, flex)
);

const Hidden: FC<HiddenProps> = ({ children, ...props }) => (
  <StyledHidden {...props}>{children}</StyledHidden>
);

export default Hidden;
