import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

import * as S from "./Modal.styled";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <S.Wrapper
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <S.CloseIcon onClick={onClose} />
          <S.Container onClick={(e) => e.stopPropagation()}>
            {children}
          </S.Container>
        </S.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
