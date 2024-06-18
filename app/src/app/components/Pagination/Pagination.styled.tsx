import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#ddd" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};

  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PrevButton = styled(IoIosArrowBack)`
  height: 20px;
  width: 20px;
`;

export const NextButton = styled(IoIosArrowForward)`
  height: 20px;
  width: 20px;
`;
