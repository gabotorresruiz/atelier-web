import React, { Children, cloneElement, FC, ReactElement } from 'react';
import { FlexboxProps } from 'styled-system';
import StyledGrid from './styles';

export interface GridProps {
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  item?: boolean;
  spacing?: number;
  className?: string;
  container?: boolean;
  containerHeight?: string;
  verticalSpacing?: number;
  horizontalSpacing?: number;
  children: ReactElement<GridProps>[] | any;
  [key: string]: unknown;
}

const Grid: FC<GridProps & FlexboxProps> = ({ children, ...props }) => {
  let childList = children;

  if (props.container) {
    childList = Children.map(children, (child) =>
      cloneElement(child, {
        spacing: props.spacing,
        horizontalSpacing: props.horizontalSpacing,
        verticalSpacing: props.verticalSpacing
      })
    );
  }

  return <StyledGrid {...props}>{childList}</StyledGrid>;
};

Grid.defaultProps = { spacing: 0, containerHeight: 'unset' };

export default Grid;
