import { FC, TextareaHTMLAttributes } from 'react';
import { BorderProps, SpaceProps } from 'styled-system';
import { colorOptions } from '../../interfaces';
import { SyledTextArea, TextAreaWrapper } from './styles';

export interface TextAreaProps
  extends SpaceProps,
    BorderProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelColor?: colorOptions;
  label?: string;
  errorText?: any;
  id?: any;
  fullwidth?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  errorText,
  labelColor,
  ...props
}: TextAreaProps) => {
  // extract spacing props
  let spacingProps = {};
  let otherProps = {};

  Object.keys(props).forEach((key) => {
    if (key.startsWith('m') || key.startsWith('p')) spacingProps[key] = props[key];
    else otherProps[key] = props[key];
  });

  return (
    <TextAreaWrapper
      color={labelColor && `${labelColor}.main`}
      fullwidth={props.fullwidth}
      {...spacingProps}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <SyledTextArea id={id} {...otherProps} />
      {errorText && <small>{errorText}</small>}
    </TextAreaWrapper>
  );
};

// eslint-disable-next-line react/default-props-match-prop-types
TextArea.defaultProps = { id: 'textArea', color: 'default' };

export default TextArea;
