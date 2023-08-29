import { ButtonHTMLAttributes, FC, memo } from 'react';
import { SpaceProps } from 'styled-system';
import { colorOptions } from '../../interfaces';
import StyledIcon from './styles';

export interface IconProps {
  size?: string;
  children: string;
  transform?: string;
  color?: colorOptions;
  variant?: 'small' | 'medium' | 'large';
  defaultcolor?: 'currentColor' | 'auto';
}

type ComponentProps = IconProps & SpaceProps & ButtonHTMLAttributes<IconProps>;

const Icon: FC<ComponentProps> = ({ children, ...props }) => {
  const handleFallBack = () => <span>{children?.trim()}</span>;

  return (
    <StyledIcon src={`/assets/images/icons/${children}.svg`} fallback={handleFallBack} {...props} />
  );
};

Icon.defaultProps = { variant: 'medium', defaultcolor: 'currentColor' };

export default memo(Icon);
