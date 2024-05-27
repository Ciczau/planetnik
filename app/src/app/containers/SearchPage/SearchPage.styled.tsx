import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  width: calc(100% - 90px);
  padding: 40px;
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
export const Activities = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  gap: 20px;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  gap: 20px;
  background-color: #e4e4e444;
  border-radius: 7px;
  width: 360px;
  padding: 20px;
`;

export const FilterCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 25px;

  &:not(:last-child) {
    border-bottom: 1px solid #b6b6b6;
  }
`;
