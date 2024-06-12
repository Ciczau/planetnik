import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./Checkbox.styled";

type Props = {
  label: string;
  onChange: () => void;
};

const Checkbox = ({ label, onChange }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
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
