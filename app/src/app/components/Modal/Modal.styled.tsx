import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000cc;
`;

export const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 25px;
  color: white;
  width: 25px;
  cursor: pointer;
`;

export const Container = styled.div`
  max-width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 3px #00000068;
`;
