import * as S from "./Checkbox.styled";

type Props = {
  checked: boolean;
  label: string;
};

const Checkbox = ({ checked, label }: Props) => {
  return (
    <S.CheckboxContainer>
      <input type="checkbox" checked={checked} />
      <label>{label}</label>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
