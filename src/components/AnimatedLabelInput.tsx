import React, { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex: 1;
`;

const InputText = styled.input`
  padding: 20px 0px 0px 0px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  flex: 1;
`;

const InputLabel = styled.label<{ hasText: boolean }>`
  position: absolute;
  pointer-events: none;
  transform: translate(0, 20px) scale(1);
  transform-origin: top left;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: #999999; // TODO: Make this part of the theme.
  font-size: 14px;

  ${InputContainer}:focus-within & {
    transform: translate(0, 0) scale(0.9);
    color: ${({ theme }) => theme.colors.primary.grey};
  }

  ${(props) =>
    props.hasText &&
    `
        transform: translate(0, 0) scale(0.9);
        color: ${props.theme.colors.primary.grey};
    `}
`;
interface IAnimatedLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  isPassword?: boolean;
  name?: string;
  isLabelAnimated?: boolean;
}

export const AnimatedLabelInput = forwardRef(
  (
    { className, label, isPassword, name, isLabelAnimated = true }: IAnimatedLabelInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [inputValue, setValue] = useState<string>('');
    const type = isPassword ? 'password' : 'text';
    // removed controlled input because react-hook-form uses refs to control/grab the value
    return (
      <InputContainer className={className}>
        <InputText type={type} ref={ref} name={name} />
        <InputLabel hasText={isLabelAnimated ? Boolean(inputValue) : true}>{label}</InputLabel>
      </InputContainer>
    );
  },
);
