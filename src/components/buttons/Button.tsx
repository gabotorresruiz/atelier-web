import systemCss from '@styled-system/css';
import { colorOptions } from 'interfaces';
import styled from 'styled-components';
import {
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  shadow,
  space,
  SpaceProps,
  variant
} from 'styled-system';

interface ButtonProps {
  fullwidth?: boolean;
  btnColor?: colorOptions;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large' | 'none';
}

const Button = styled.button<
  ColorProps & BackgroundProps & BorderProps & SpaceProps & ButtonProps & LayoutProps
>(
  ({ btnColor, fullwidth }) =>
    systemCss({
      display: 'flex',
      width: fullwidth ? '100%' : 'unset',
      justifyContent: 'center',
      alignItems: 'center',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '11px 1.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: 'inherit',
      color: btnColor ? `${btnColor}.main` : 'body.text',
      background: 'transparent',
      transition: 'all 150ms ease-in-out',
      lineHeight: 1,
      '&:focus': {
        boxShadow: 3 // shadows[3]
      },
      '&:disabled': {
        bg: 'text.disabled',
        color: 'text.hint',
        borderColor: 'text.disabled',
        cursor: 'unset',
        'svg path': {
          fill: 'text.hint'
        },
        'svg polyline, svg polygon': {
          color: 'text.hint'
        }
      }
    }),
  ({ theme, btnColor }) =>
    variant({
      prop: 'variant',
      variants: {
        text: {
          border: 'none',
          color: `${btnColor}.main`,
          '&:hover': {
            bg: btnColor ? `${btnColor}.light` : 'gray.100'
          }
        },
        outlined: {
          padding: '10px 16px',
          color: `${btnColor}.main`,
          border: '1px solid',
          borderColor: btnColor ? `${btnColor}.main` : 'text.disabled',

          '&:enabled svg path': {
            fill: btnColor ? `${theme.colors[btnColor]?.main} !important` : 'text.primary'
          },
          '&:enabled svg polyline, svg polygon': {
            color: btnColor ? `${theme.colors[btnColor]?.main} !important` : 'text.primary'
          },
          '&:focus': {
            boxShadow: `0px 1px 4px 0px ${theme.colors[btnColor]?.light}`
          },
          '&:hover:enabled': {
            bg: color && `${color}.main`,
            borderColor: color && `${color}.main`,
            color: color && `${color}.text`,
            'svg path': {
              fill: color ? `${theme.colors[btnColor]?.text} !important` : 'text.primary'
            },
            'svg polyline, svg polygon': {
              color: color ? `${theme.colors[btnColor]?.text} !important` : 'text.primary'
            },
            ...(btnColor === 'dark' && { color: 'white' })
          }
        },
        contained: {
          border: 'none',
          color: `${color}.text`,
          bg: `${color}.main`,
          '&:focus': {
            boxShadow: `0px 1px 4px 0px ${theme.colors[btnColor]?.light}`
          },
          '&:enabled svg path': {
            fill: btnColor ? `${theme.colors[btnColor]?.text} !important` : 'text.primary'
          },
          '&:enabled svg polyline, svg polygon': {
            color: btnColor ? `${theme.colors[btnColor]?.text} !important` : 'text.primary'
          }
        }
      }
    }),
  variant({
    prop: 'size',
    variants: {
      large: { height: '56px', px: 30 },
      medium: { height: '48px', px: 30 },
      small: { height: '40px', fontSize: 14 }
    }
  }),
  compose(color, layout, space, border, shadow)
);

Button.defaultProps = { size: 'small', borderRadius: 5 };

export default Button;
