import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Activity = styled.div`
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-top: 20px;
  transition: 0.2s ease-in;
  transform: scale(1);
  &:hover {
    transform: scale(1.01);
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: absolute;
  bottom: 15px;
  left: 50%;
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
