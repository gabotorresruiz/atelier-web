import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import systemCss from '@styled-system/css';
import { color, compose, space, variant } from 'styled-system';
import { IconProps } from './Icon';

const StyledIcon = styled(ReactSVG)<IconProps>(
  ({ color: iconColor, size, transform, defaultcolor }) =>
    systemCss({
      svg: {
        transform,
        width: '100%',
        height: '100%',

        path: { fill: iconColor ? `${iconColor}.main` : defaultcolor },
        polyline: { color: iconColor ? `${iconColor}.main` : defaultcolor },
        polygon: { color: iconColor ? `${iconColor}.main` : defaultcolor }
      },

      div: { display: 'flex', width: size, height: size }
    }),
  ({ size }) =>
    variant({
      prop: 'variant',
      variants: {
        large: { div: { width: size || '2rem', height: size || '2rem' } },
        medium: { div: { width: size || '1.5rem', height: size || '1.5rem' } },
        small: { div: { width: size || '1.25rem', height: size || '1.25rem' } }
      }
    }),
  compose(color, space)
);

export default StyledIcon;
