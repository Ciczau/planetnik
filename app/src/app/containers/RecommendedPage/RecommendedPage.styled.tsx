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
  min-height: 100vh;
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
