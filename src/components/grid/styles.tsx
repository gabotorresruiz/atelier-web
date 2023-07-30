import styled from 'styled-components';
import { compose, flexbox } from 'styled-system';
import { GridProps } from './Grid';

const mediaSize = {
  xs: 0,
  sm: 426,
  md: 769,
  lg: 1025,
  xl: 1441
};

const StyledGrid = styled.div<GridProps>(
  ({
    container,
    item,
    spacing,
    horizontalSpacing,
    verticalSpacing,
    xl,
    lg,
    md,
    sm,
    xs,
    containerHeight
  }) => {
    let mediaProps = { xl, lg, md, sm, xs };
    let style: any = {};

    if (container) {
      style = {
        display: 'flex',
        flexWrap: 'wrap',
        height: containerHeight,
        margin: spacing ? `-${(spacing / 2) * 0.25}rem` : 'unset'
      };

      if (horizontalSpacing) {
        style.marginLeft = `-${(horizontalSpacing / 2) * 0.25}rem`;
        style.marginRight = `-${(horizontalSpacing / 2) * 0.25}rem`;
      }
      if (verticalSpacing) {
        style.marginTop = `-${(verticalSpacing / 2) * 0.25}rem`;
        style.marginBottom = `-${(verticalSpacing / 2) * 0.25}rem`;
      }
    } else if (item) {
      if (spacing) style.padding = `${(spacing / 2) * 0.25}rem`;

      if (horizontalSpacing) {
        style.paddingLeft = `${(horizontalSpacing / 2) * 0.25}rem`;
        style.paddingRight = `${(horizontalSpacing / 2) * 0.25}rem`;
      }

      if (verticalSpacing) {
        style.paddingTop = `${(verticalSpacing / 2) * 0.25}rem`;
        style.paddingBottom = `${(verticalSpacing / 2) * 0.25}rem`;
      }

      Object.keys(mediaSize).forEach((key) => {
        if (mediaProps[key]) {
          style = {
            ...style,
            [`@media only screen and (min-width: ${mediaSize[key]}px)`]: {
              width: `${(mediaProps[key] / 12) * 100}%`
            }
          };
        }
      });
    }

    return style;
  },
  compose(flexbox)
);

export default StyledGrid;
