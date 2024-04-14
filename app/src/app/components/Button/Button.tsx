import * as S from "./Button.styled";

type Props = {
  children: React.ReactNode;
  version?: "primary" | "secondary";
  type?: "normal" | "icon";
  textPosition?: "left" | "right" | "center";
  onClick?: () => void;
};

const Button = ({
  children,
  version = "primary",
  onClick,
  type = "normal",
  textPosition = "center",
}: Props) => {
  return (
    <S.Button
      version={version}
      textPosition={textPosition}
      type={type}
      onClick={() => onClick?.()}
    >
      {children}
    </S.Button>
  );
};

export default Button;
