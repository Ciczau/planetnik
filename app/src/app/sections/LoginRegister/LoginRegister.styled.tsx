import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)<{ reverse: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: #f8f8f8;
`;

export const LeftContainer = styled(motion.div)`
  height: 100%;
  width: 50%;
  box-shadow: 0px 0px 5px 3px #00000068;
  position: relative;
  background: url("/background.png") center/cover;
  overflow: hidden;
  z-index: 2;
`;

export const OverlayContainer = styled(motion.div)<{ swap: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  backdrop-filter: brightness(0.6);
  transform: ${({ swap }) => (!swap ? "translateX(0)" : "translateX(-50%)")};
  transition: 0.5s ease;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayContent = styled.div<{ swap: boolean; type: boolean }>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ swap, type }) =>
    !swap ? "translateX(0%)" : `translateX(${type ? "-50%" : "50%"})`};
  transition-delay: 0.2s;
  transition: 0.5s ease-in-out;

  p {
    font-size: 40px;
    color: white;
    font-weight: bold;
    text-shadow: 5px 5px 5px #000000d5;
  }
  button {
    margin: 25px 0;
    font-size: 18px;
    padding: 10px 30px;
    font-weight: bold;
  }
`;

export const RightContainer = styled(motion.div)`
  height: 100%;
  width: 50%;
  z-index: 1;
  position: relative;
  background-color: #f8f8f8;

  button {
    margin: 20px 0;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input<{ error: boolean }>`
  padding: 15px;
  width: 400px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #d4d4d4")};
  box-shadow: 1px 1px 7px 2px #00000037;
  margin-top: 20px;
`;

export const ErrorMessage = styled.div`
  width: 400px;
  text-align: left;
  color: red;
  font-size: 14px;
  margin: 5px 0 0px 4px;
  font-weight: bold;
`;
