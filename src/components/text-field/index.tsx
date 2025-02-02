import { cloneElement, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { SpaceProps } from 'styled-system';
import Box from '../Box';
import { colorOptions } from '../../interfaces';
import { SyledTextField, TextFieldWrapper } from './styles';

export interface TextFieldProps {
  labelColor?: colorOptions;
  label?: string;
  errorText?: any;
  id?: any;
  fullwidth?: boolean;
  endAdornment?: any;
}

const TextField: FC<InputHTMLAttributes<HTMLInputElement> & TextFieldProps & SpaceProps> = ({
  id,
  label,
  errorText,
  labelColor,
  endAdornment,
  ...props
}) => {
  const [textId, setTextId] = useState(id);

  // extract spacing props
  let spacingProps = {};

  Object.keys(props).forEach((key) => {
    if (key.startsWith('m') || key.startsWith('p')) spacingProps[key] = props[key];
  });

  useEffect(() => {
    if (!id) setTextId(Math.random());
  }, [id]);

  return (
    <TextFieldWrapper
      color={labelColor && `${labelColor}.main`}
      fullwidth={props.fullwidth}
      {...spacingProps}
    >
      {label && <label htmlFor={textId}>{label}</label>}
      <Box position="relative">
        <SyledTextField id={textId} {...props} />
        {endAdornment &&
          cloneElement(endAdornment, {
            className: `end-adornment ${endAdornment.className}`
          })}
      </Box>
      {errorText && <small>{errorText}</small>}
    </TextFieldWrapper>
  );
};

// eslint-disable-next-line react/default-props-match-prop-types
TextField.defaultProps = { color: 'default' };

export default TextField;
