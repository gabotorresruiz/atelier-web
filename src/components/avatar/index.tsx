import { FC } from 'react';
import Image from '@component/Image';
import { BorderProps, ColorProps } from 'styled-system';
import StyledAvatar from './styles';

export interface AvatarProps extends BorderProps, ColorProps {
  src?: string;
  size?: number;
  children?: any;
  [key: string]: any;
}

const Avatar: FC<AvatarProps> = ({ src, size, children, ...props }) => (
  <StyledAvatar size={size} {...props}>
    {src && <Image alt="avatar" src={src} />}
    {!src && children && <span>{children}</span>}
  </StyledAvatar>
);

Avatar.defaultProps = { size: 48 };

export default Avatar;
