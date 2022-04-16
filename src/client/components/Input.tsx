import styled from '@emotion/styled';
import React from 'react';

const Copntainer = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.92857143em;
    font-weight: 700;
  }

  > input {
    box-sizing: border-box;
    margin: 10px 0px;
    outline: 0;
    line-height: 1.21428571em;
    padding: 10px;
    font-size: 1em;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 4px;
    width: 100%;
    vertical-align: top;
  }
`;

type Props = {
  label?: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  placeholder,
  value,
  disabled = false,
  onChange,
}: Props) {
  return (
    <Copntainer>
      {label && <span>{label}</span>}
      <input {...{ placeholder, value, onChange, disabled }} />
    </Copntainer>
  );
}

export default Input;
