import { ReactNode } from "react";

import * as S from "./Modal.styled";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <S.Wrapper onClick={onClose}>
          <S.CloseIcon onClick={onClose} />
          <S.Container onClick={(e) => e.stopPropagation()}>
            {children}
          </S.Container>
        </S.Wrapper>
      )}
    </>
  );
};

export default Modal;
