import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: calc(100% - 90px);
  margin-left: 90px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
`;
export const NavigationPanel = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 3px #00000034;
`;

export const Menu = styled.div`
  display: flex;
  gap: 35px;
`;

export const NavigationPanelItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  p {
    font-weight: ${(props) => (props.active ? "700" : "400")};
  }
`;

export const FormWrapper = styled(motion.div)``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 50%;
  margin: 100px auto;

  button {
    margin-top: 20px;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  padding: 10px;
  margin-top: 10px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #000000")};
`;
export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;
