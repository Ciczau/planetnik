import * as S from "./Typography.styled";

type Props = {
  tag: string;
  children: React.ReactNode;
};

const Typography = ({ tag, children }: Props) => {
  return <S.Typography tag={tag}>{children}</S.Typography>;
};

export default Typography;
