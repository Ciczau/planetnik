import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./Checkbox.styled";

type Props = {
  label: string;
  onChange: () => void;
  checked: boolean;
};

const Checkbox = ({ label, onChange, checked }: Props) => {
  const handleChange = () => {
    onChange();
  };
  return (
    <S.CheckboxContainer onClick={handleChange}>
      <input type="checkbox" checked={checked} />
      <label>{label}</label>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
