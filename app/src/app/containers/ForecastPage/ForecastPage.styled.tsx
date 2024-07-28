import { FaMoon, FaSun } from "react-icons/fa";
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
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
`;
export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  background-color: #f0f0f06a;
  padding: 25px;
  border-radius: 10px;
  width: 950px;
`;

export const MoonIcon = styled(FaMoon)`
  height: 35px;
  width: 35px;
  color: #3a3a3a;
`;

export const SunIcon = styled(FaSun)`
  height: 35px;
  width: 35px;
  color: #ffe70b;
`;

export const ChartTitle = styled.h2`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const ChartLegend = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 8px;
  border-bottom: 1px solid #cacaca;
`;

export const ChartLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

interface ChartPointProps {
  temp: number;
  chuj: number;
  cipa: number;
  rotate?: number;
  length?: number;
}

export const ChartPoint = styled.div<ChartPointProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9em;

  margin-top: ${({ chuj, cipa }) => `${(chuj / cipa) * 150}px`};

  &::after {
    position: relative;
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: ${({ temp }) => (temp > 0 ? "#FFD700" : "#ADD8E6")};
    border-radius: 50%;
    margin-top: 10px;

    &::after {
      content: "";
      display: block;
      width: ${({ length }) => `${length}px` || "100px"};
      height: 1px;
      position: absolute;
      left: 0;
      margin-left: -100%;
      transform: translateX(50%) rotate(${({ rotate }) => `${rotate}deg`});
      background-color: red;
    }
  }
`;

export const Kutasisko = styled.div<{ rotate?: number; length?: number }>`
  width: ${({ length }) => `${length}px` || "100px"};
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;

  transform: rotate(${({ rotate }) => `${rotate}deg`});
  background-color: red;
`;

export const ChartGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    width: 1px;
    background-color: #ddd;
  }
`;
