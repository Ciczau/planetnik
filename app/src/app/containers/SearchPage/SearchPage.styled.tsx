import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { keyframes } from "styled-components";

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
  position: relative;
  justify-content: space-between;
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

const loaderAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 6px solid #e4e4e4;
  border-top: 6px solid #888888;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${loaderAnimation} 2s linear infinite;
  margin: auto;
`;

export const Activities = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  gap: 20px;
`;

export const Filters = styled.div`
  display: flex;
  top: 20px;
  flex-direction: column;
  position: sticky;
  gap: 20px;
  background-color: #e4e4e444;
  border-radius: 7px;
  width: 360px;
  padding: 20px;
  height: 600px;
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
