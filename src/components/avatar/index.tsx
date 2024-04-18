import { FC } from 'react';
import Image from '@component/Image';
import { BorderProps, ColorProps } from 'styled-system';
import StyledAvatar from './styles';

export interface AvatarProps extends BorderProps, ColorProps {
  alt?: string;
  src?: string;
  size?: number;
  children?: any;
  [key: string]: any;
}

const Avatar: FC<AvatarProps> = ({ alt, src, size, children, ...props }) => (
  <StyledAvatar size={size} {...props}>
    {src && <Image alt={alt} src={src} style={{ objectFit: 'contain' }} />}
    {!src && children && <span>{children}</span>}
  </StyledAvatar>
);

Avatar.defaultProps = { size: 48 };

export default Avatar;
