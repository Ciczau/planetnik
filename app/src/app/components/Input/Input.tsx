import * as S from "./Input.styled";

type Props = {
  version?: "primary" | "secondary";
  border?: boolean;
  placeholder: string;
  width?: number;
  type?: string;
};

const Input = ({
  version = "primary",
  placeholder,
  width,
  type,
  border,
}: Props) => {
  return (
    <S.Input
      placeholder={placeholder}
      type={type}
      border={border}
      version={version}
      width={width}
    />
  );
};

export default Input;
