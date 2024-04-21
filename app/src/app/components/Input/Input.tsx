import { UseFormRegister, RegisterOptions, FieldValues } from "react-hook-form";
import * as S from "./Input.styled";

type Props = {
  version?: "primary" | "secondary";
  border?: boolean;
  placeholder: string;
  width?: number;
  type?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  ref?: any;
};

const Input = ({
  version = "primary",
  placeholder,
  width,
  type,
  border,
  onKeyUp,
  value,
  ref,
  onChange,
}: Props) => {
  return (
    <S.Input
      placeholder={placeholder}
      type={type}
      border={border}
      version={version}
      width={width}
      onKeyUp={onKeyUp}
      defaultValue={value}
      ref={ref}
      onChange={onChange}
    />
  );
};

export default Input;
